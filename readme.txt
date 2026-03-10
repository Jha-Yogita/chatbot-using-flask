v# AI Chatbot

A modern AI chatbot powered by Facebook's BlenderBot model.

## Features
- 💬 Real-time chat with AI
- 🎨 Clean, modern UI with gradients
- 📱 Mobile responsive design
- ⌨️ Enter to send, Shift+Enter for new line
- ⏳ Loading animations
- 💾 Chat history saved in browser
- ❌ Error handling

## Quick Start

1. Install Python (3.8 or higher)

2. Download project
   git clone https://github.com/Jha-Yogita/chatbot-using-flask
   cd ai-chatbot

3. Install requirements
   pip install flask flask-cors transformers torch

4. Add images to static/ folder:
   - user.jpeg (User avatar)
   - Bot_logo.png (Bot avatar)
   - Error.png (Error icon)

5. Run the app
   python app.py

6. Open browser - Go to http://localhost:5000

## Project Structure
ai-chatbot/
├── app.py
├── static/
│   ├── css/
│   │   └── style.css
│   ├── script.js
│   └── (your images)
└── templates/
    └── index.html

## How to Use
- Type message → Press Enter → Get AI response
- Click "New Chat" in footer to reset
- Chat history auto-saves in browser

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- AI: Facebook BlenderBot 400M

