import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Mail, Briefcase, Code, ChevronRight, Github, Linkedin, Loader2 } from 'lucide-react';

// --- MAIN PORTFOLIO COMPONENT ---
export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Sending...');
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setName(''); setEmail(''); setMessage('');
      } else {
        setFormStatus('Failed to send message.');
      }
    } catch (error) {
      setFormStatus('Error connecting to server.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200">
      
      {/* Header / Nav */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tighter">Md Kaif</h1>
          <nav className="space-x-6 hidden sm:block text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#skills" className="hover:text-blue-600 transition">Skills</a>
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20 space-y-32">
        
        {/* Hero Section */}
        <section id="hero" className="py-20 flex flex-col items-start justify-center text-left">
          <p className="text-blue-600 font-semibold mb-4 tracking-wide uppercase text-sm">Hi, my name is</p>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">Md Kaif</h2>
          <h3 className="text-4xl sm:text-6xl font-bold text-gray-400 mb-8">I build robust software & web applications.</h3>
          <p className="max-w-2xl text-lg text-gray-600 leading-relaxed mb-10">
            I'm an MCA student and aspiring Software Developer specializing in Java, SpringBoot, and front-end technologies. I focus on building efficient, scalable, and analytical digital solutions.
          </p>
          <div className="flex space-x-4">
            <a href="#contact" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              Get In Touch
            </a>
            <a href="https://github.com/md-kaif-MCA" target="_blank" rel="noreferrer" className="p-3 bg-white text-gray-700 rounded-lg hover:text-blue-600 shadow-sm border border-gray-200 transition">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kaif0079" target="_blank" rel="noreferrer" className="p-3 bg-white text-gray-700 rounded-lg hover:text-blue-600 shadow-sm border border-gray-200 transition">
              <Linkedin size={24} />
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-28">
          <div className="flex items-center mb-8">
            <User className="text-blue-600 mr-3" size={28} />
            <h3 className="text-3xl font-bold">About Me</h3>
            <div className="h-px bg-gray-300 flex-grow ml-6"></div>
          </div>
          <div className="text-gray-600 text-lg leading-relaxed max-w-3xl space-y-4">
            <p>
              Hello! My name is Md Kaif and I'm currently pursuing my Master of Computer Applications (MCA) at MIET, Meerut. I have a strong foundation in analytical problem-solving and a deep interest in software development.
            </p>
            <p>
              My technical journey spans across core backend programming with Java, SpringBoot, and Hibernate, along with front-end web development using HTML, CSS, and JavaScript. I'm a highly self-motivated, quick learner who enjoys collaborating with teams to build impactful applications.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-28">
          <div className="flex items-center mb-8">
            <Code className="text-blue-600 mr-3" size={28} />
            <h3 className="text-3xl font-bold">Technical Skills</h3>
            <div className="h-px bg-gray-300 flex-grow ml-6"></div>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-gray-600 font-medium">
            {['Java', 'SpringBoot', 'Hibernate', 'JDBC', 'SQL / MySQL', 'HTML / CSS / JS', 'C / C++', 'Python'].map(skill => (
              <li key={skill} className="flex items-center bg-white p-3 rounded border border-gray-100 shadow-sm">
                <ChevronRight className="text-blue-500 mr-2" size={16} />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-28">
          <div className="flex items-center mb-10">
            <Briefcase className="text-blue-600 mr-3" size={28} />
            <h3 className="text-3xl font-bold">Some Things I've Built</h3>
            <div className="h-px bg-gray-300 flex-grow ml-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center p-4 text-center">
                <span className="text-gray-500 font-medium text-lg">SkillLink Marketplace</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">SkillLink</h4>
                <p className="text-gray-600 text-sm mb-4">A Marketplace Model (similar to Urban Company or Meesho) that decentralizes home services. Operates a dual-user ecosystem for Service Providers and Consumers, managed by an Admin panel.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-blue-600 bg-blue-50 p-3 rounded mb-4">
                  <span>HTML</span> <span>CSS</span> <span>JavaScript</span>
                </div>
                <a href="https://the-skill-link.web.app/index.html" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">View Live Project &rarr;</a>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center p-4 text-center">
                <span className="text-gray-500 font-medium text-lg">Car Booking System</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">Car Booking System</h4>
                <p className="text-gray-600 text-sm mb-4">A service-based platform where users can log in, book a car, set their destination, and receive an automated detailed receipt including all calculated charges.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-blue-600 bg-blue-50 p-3 rounded">
                  <span>Core Java</span> <span>OOPs</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition md:col-span-2 lg:col-span-1">
              <div className="h-48 bg-gray-200 flex items-center justify-center p-4 text-center">
                <span className="text-gray-500 font-medium text-lg">To Do List App</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">To Do List</h4>
                <p className="text-gray-600 text-sm mb-4">A desktop software application that allows users to add tasks, track their status, and mark them as done for effective daily management.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-blue-600 bg-blue-50 p-3 rounded">
                  <span>Java Swing</span> <span>JDBC</span> <span>MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-28 mb-20 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Mail className="text-blue-600 mr-3" size={28} />
            <h3 className="text-3xl font-bold">Get In Touch</h3>
          </div>
          <p className="text-gray-600 mb-8">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <form onSubmit={handleContactSubmit} className="space-y-4 text-left bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition">
              Send Message
            </button>
            {formStatus && <p className="text-center text-sm font-medium text-blue-600 mt-2">{formStatus}</p>}
          </form>
        </section>

      </main>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}

// --- AI CHAT WIDGET COMPONENT ---
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm the AI assistant for Md Kaif. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1).map(m => ({ role: m.role, content: m.content })) // omit initial greeting from history payload
        }),
      });

      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry! server busy try again leter." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition transform hover:scale-105"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[350px] max-w-[calc(100vw-3rem)] overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h4 className="font-semibold">AI Assistant</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 rounded-xl rounded-bl-none shadow-sm p-3">
                  <Loader2 className="animate-spin" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              className="flex-1 bg-gray-100 rounded-l-lg px-4 py-2 focus:outline-none text-sm"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 text-white p-2 px-3 rounded-r-lg hover:bg-blue-700 transition disabled:opacity-50">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}