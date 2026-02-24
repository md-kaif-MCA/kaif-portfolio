from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import requests
import os

app = FastAPI()

# Allow frontend to communicate with backend
# IMPORTANT: For production, restrict allow_origins to your specific frontend domain,
# e.g., allow_origins=["https://your-portfolio-frontend.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://mohd-kaif-portfolio.pages.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --- OpenRouter API Key ---
# It's highly recommended to use environment variables for API keys.
# You can set it in your terminal before running the app:
# export OPENROUTER_API_KEY="sk-or-v1-YOUR_ACTUAL_KEY"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "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") # Fallback key - REMOVE for production

# --- DATABASE SETUP ---
# Initializes the SQLite database and creates the 'contacts' table if it doesn't exist.
def init_db():
    conn = sqlite3.connect("portfolio.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS contacts
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)''')
    conn.commit()
    conn.close()
    print("Database initialized.")

init_db()

# --- DATA MODELS ---
# Pydantic models for request validation.

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = [] # Stores previous messages for context

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

# --- API ENDPOINTS ---

@app.post("/api/chat")
async def chat_with_ai(req: ChatRequest):
    """
    Handles communication with OpenRouter AI models.
    Implements a smart fallback strategy: tries a list of free models.
    If all free models fail, it raises a 500 error.
    """
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", # Your frontend's origin (adjust if needed)
        "X-Title": "Md Kaif Portfolio"           # Identifier for OpenRouter
    }

    # Construct messages for the AI, including system prompt and conversation history
    messages = [{
        "role": "system", 
        "content": "You are a helpful, professional AI assistant for Md Kaif's portfolio website. Md Kaif is an MCA student and Software Developer specializing in Java, SpringBoot, Hibernate, SQL, and frontend web development. Answer questions about his skills, projects (like SkillLink, Car Booking, To Do List), experience, or general inquiries politely and concisely."
    }]
    messages.extend(req.history) # Add past conversation turns
    messages.append({"role": "user", "content": req.message}) # Add the latest user message

    # --- FREE MODEL FALLBACK STRATEGY ---
    # List of free models to try. Order can matter; start with generally stable ones.
    # These models are chosen for their availability as 'free' tier on OpenRouter.
    # Your 500 error meant ALL of these were unavailable at that moment.
    free_models = [
        "gryphe/mythomax-l2-13b:free",
        "deepseek/deepseek-v3.2",
        "openchat/openchat-7b:free",
        "liquid/lfm-40b:free", # This is a larger model, potentially slower but capable
        "google/gemini-2.0-pro-exp-02-05:free" # Example of another free option
    ]

    # premium_model = "openai/gpt-4o-mini" # Example of a cost-effective premium model
    # fallback_models = free_models + [premium_model]
    models_to_try = free_models # Use this line if NOT using the optional premium fallback
    # models_to_try = fallback_models # Uncomment this line to use the optional premium fallback

    print(f"Attempting to chat with AI using models: {models_to_try}")

    for model_id in models_to_try:
        data = {
            "model": model_id, 
            "messages": messages
        }

        try:
            print(f"Trying model: '{model_id}'...")
            response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data, timeout=30) # Added a timeout
            response.raise_for_status() # Raises an HTTPError for bad responses (4xx or 5xx)
            
            result = response.json()
            reply = result["choices"][0]["message"]["content"]
            print(f"Successfully received response from '{model_id}'!")
            return {"reply": reply} # Return the successful response
            
        except requests.exceptions.HTTPError as e:
            # Handle specific HTTP errors from the API
            error_details = f"HTTP Error {e.response.status_code}: {e.response.text}"
            if response.status_code == 404:
                print(f"Model '{model_id}' is currently unavailable or not found. Trying next model...")
            elif response.status_code == 400:
                 print(f"Bad Request for '{model_id}'. Error: {error_details}. Trying next model...")
            elif response.status_code == 429:
                 print(f"Rate limit exceeded for '{model_id}'. Error: {error_details}. Trying next model...")
            else:
                print(f"An unexpected HTTP error occurred with '{model_id}'. Error: {error_details}. Trying next model...")
            continue # Move to the next model in the list

        except requests.exceptions.RequestException as e:
            # Handle other request-related errors (e.g., network issues, timeouts)
            print(f"Request failed for '{model_id}': {str(e)}. Trying next model...")
            continue # Move to the next model

        except Exception as e:
            # Catch any other unexpected errors
            print(f"An unexpected general error occurred with '{model_id}': {str(e)}. Trying next model...")
            continue # Move to the next model

    # --- FINAL FALLBACK ---
    # If the loop completes and no model was successful
    error_message = "All available AI models are currently busy or unavailable. Please try again in a few minutes. If the issue persists, consider enabling a premium model for greater reliability."
    print(f"All models failed. {error_message}")
    raise HTTPException(status_code=500, detail=error_message)


@app.post("/api/contact")
async def submit_contact_form(req: ContactRequest):
    """
    Saves contact form submissions to the SQLite database.
    """
    print(f"Received contact submission from {req.name} ({req.email}).")
    try:
        conn = sqlite3.connect("portfolio.db")
        c = conn.cursor()
        c.execute("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
                  (req.name, req.email, req.message))
        conn.commit()
        conn.close()
        print(f"Contact submission from {req.name} saved successfully.")
        return {"status": "success", "message": "Your message has been saved to the database."}
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail=f"Database operation failed: {e}")
    except Exception as e:
        print(f"An unexpected error occurred during contact submission: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while processing your message.")

# --- RUNNING THE APP ---
# Save this file as main.py
# Run using: uvicorn main:app --reload