# 🤖 AI Chatbot (Flask + BlenderBot)

A modern **AI-powered chatbot** built with **Flask** and **Facebook’s BlenderBot model**.
The application provides a clean conversational interface with persistent chat history and a responsive UI.

---

## 🚀 Features

* 💬 **Real-time AI chat**
* 🧠 Powered by **Facebook BlenderBot 400M**
* 🎨 **Modern gradient UI**
* 📱 **Fully mobile responsive**
* ⌨️ **Keyboard shortcuts**

  * `Enter` → Send message
  * `Shift + Enter` → New line
* ⏳ **Typing / loading animations**
* 💾 **Chat history stored in browser**
* ❌ **Graceful error handling**

---

## 🛠 Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Frontend     | HTML, CSS, JavaScript              |
| Backend      | Python, Flask                      |
| AI Model     | Facebook BlenderBot 400M           |
| ML Framework | HuggingFace Transformers + PyTorch |

---

## ⚡ Quick Start

### 1️⃣ Install Python

Make sure Python **3.8+** is installed.

```bash
python --version
```

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/Jha-Yogita/chatbot-using-flask
cd chatbot-using-flask
```

---

### 3️⃣ Install Dependencies

```bash
pip install flask flask-cors transformers torch
```

---

### 4️⃣ Add Required Images

Place the following images inside the **`static/`** folder.

```
static/
│
├── user.jpeg       # User avatar
├── Bot_logo.png    # Bot avatar
└── Error.png       # Error icon
```

---

### 5️⃣ Run the Application

```bash
python app.py
```

---

### 6️⃣ Open the App

Go to:

```
http://localhost:5000
```

---

## 📂 Project Structure

```
ai-chatbot/
│
├── app.py
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   ├── script.js
│   └── images/
│       ├── user.jpeg
│       ├── Bot_logo.png
│       └── Error.png
│
└── templates/
    └── index.html
```

---

## 🧑‍💻 How to Use

1️⃣ Type a message in the chat input
2️⃣ Press **Enter** to send
3️⃣ The AI will generate a response instantly

Additional controls:

* 🆕 **New Chat** → Reset conversation
* 💾 **Chat history** automatically saved in browser storage

---

## 🧠 AI Model

This project uses the **Facebook BlenderBot 400M** conversational AI model from **HuggingFace Transformers**.

It is designed for:

* Open-domain conversation
* Context-aware responses
* Natural dialogue generation

---

## 📌 Future Improvements

* 🌐 Deploy online (Render / Vercel / Railway)
* 🔑 Add authentication
* 🧠 Use larger models (BlenderBot 3 / Llama)
* 💬 Add multi-chat sessions
* 📊 Analytics for conversations

---

## 👩‍💻 Author

**Yogita Jha**

* GitHub: https://github.com/Jha-Yogita

---

⭐ If you like this project, consider **starring the repository!**
