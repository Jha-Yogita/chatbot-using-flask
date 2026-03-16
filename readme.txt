# 🤖 AI Chatbot (Flask + BlenderBot)

A modern AI-powered chatbot built using **Flask** and **Facebook's BlenderBot** model.
The application provides a clean conversational interface with persistent chat history and a responsive UI.

---

## 🚀 Features

- 💬 Real-time AI chat
- 🧠 Powered by **Facebook BlenderBot 400M**
- 🎨 Clean modern UI with gradients
- 📱 Fully mobile responsive
- ⌨️ Keyboard shortcuts
  - `Enter` — Send message
  - `Shift + Enter` — New line
- ⏳ Typing and loading animations
- 💾 Chat history saved in browser
- ❌ Graceful error handling

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|------------------------------------|
| Frontend     | HTML, CSS, JavaScript              |
| Backend      | Python, Flask                      |
| AI Model     | Facebook BlenderBot 400M           |
| ML Framework | HuggingFace Transformers + PyTorch |

---

## ⚡ Quick Start

### 1. Install Python

Make sure **Python 3.8 or higher** is installed.
```bash
python --version
```

### 2. Clone the repository
```bash
git clone https://github.com/Jha-Yogita/chatbot-using-flask
cd chatbot-using-flask
```

### 3. Install dependencies
```bash
pip install flask flask-cors transformers torch
```

### 4. Add required images

Place the following images inside the `static/` folder:
```
static/
├── user.jpeg       # User avatar
├── Bot_logo.png    # Bot avatar
└── Error.png       # Error icon
```

### 5. Run the application
```bash
python app.py
```

### 6. Open the application

Navigate to:
```
http://localhost:5000
```

---

## 📂 Project Structure
```
ai-chatbot/
├── app.py
├── static/
│   ├── css/
│   │   └── style.css
│   ├── script.js
│   ├── user.jpeg
│   ├── Bot_logo.png
│   └── Error.png
└── templates/
    └── index.html
```

---



- Open-domain conversations
- Context-aware responses
- Natural dialogue generation
