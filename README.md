AI-Powered Portfolio Setup Guide

This guide will walk you through running your React/TypeScript frontend and Python backend together in VS Code.

Prerequisites

Node.js: Installed on your system (Download from nodejs.org)

Python 3: Installed on your system (Download from python.org)

OpenRouter API Key: Go to OpenRouter.ai, create a free account, and generate an API key.

Step 1: Set up the Python Backend

Open VS Code and create a new folder for your project.

Open the terminal in VS Code (Ctrl + ~).

Create the backend script: Create a file named main.py and paste the backend code into it.

Create a virtual environment (recommended):

python -m venv venv



Activate the virtual environment:

Windows: .\venv\Scripts\activate

Mac/Linux: source venv/bin/activate

Install required packages:

pip install fastapi uvicorn pydantic requests



Add your API Key:
Replace "YOUR_OPENROUTER_API_KEY_HERE" inside main.py with your actual OpenRouter API key.

Run the backend server:

uvicorn main:app --reload



Your backend is now running at http://localhost:8000

Step 2: Set up the React Frontend

Open a second terminal window in VS Code (keep the first one running the backend).

Create the React app using Vite:

npm create vite@latest frontend -- --template react-ts



Move into the frontend directory:

cd frontend



Install dependencies:

npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer



Initialize Tailwind CSS:

npx tailwindcss init -p



Configure Tailwind: Open tailwind.config.js and replace its contents with:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



Add Tailwind Directives: Open src/index.css and add these three lines to the top, replacing everything else:

@tailwind base;
@tailwind components;
@tailwind utilities;



Add the Code: Open src/App.tsx and replace everything with the Frontend React code provided above. Remember to edit [YOUR NAME] and other placeholders in the file!

Run the Frontend:

npm run dev



Step 3: View Your Portfolio

Click the local link generated in your second terminal (usually http://localhost:5173).

Click the floating chat button in the bottom right to talk to your AI.

Test the contact form. It will save the messages directly into a local file called portfolio.db inside your backend folder!