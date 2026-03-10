class Chatbot {
  constructor() {
    this.messagesContainer = document.getElementById('messages-container');
    this.messageForm = document.getElementById('message-form');
    this.messageInput = document.getElementById('message-input');
    this.history = [];
    this.init();
  }

  init() {
    this.messageForm.addEventListener('submit', (e) => this.handleSubmit(e));
    this.messageInput.addEventListener('keydown', (e) => this.handleKeyPress(e));
    this.messageInput.addEventListener('input', () => this.autoResizeTextarea());
    this.loadHistory();
  }

  autoResizeTextarea() {
    this.messageInput.style.height = 'auto';
    this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.messageForm.dispatchEvent(new Event('submit'));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const message = this.messageInput.value.trim();
    
    if (!message) return;
    
    this.messageInput.value = '';
    this.messageInput.style.height = 'auto';
    await this.sendMessage(message);
  }

  addMessage(message, role, imgSrc) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `${role} avatar`;
    
    const text = document.createElement('p');
    text.textContent = message;
    
    messageDiv.appendChild(img);
    messageDiv.appendChild(text);
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
    
    if (role === 'user') {
      this.history.push({ role, content: message });
      this.saveHistory();
    }
  }

  showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-container';
    loadingDiv.id = 'loading-container';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-animation';
    
    const text = document.createElement('div');
    text.className = 'loading-text';
    text.textContent = 'AI is thinking...';
    
    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(text);
    this.messagesContainer.appendChild(loadingDiv);
    this.scrollToBottom();
  }

  hideLoading() {
    const loadingContainer = document.getElementById('loading-container');
    if (loadingContainer) {
      loadingContainer.remove();
    }
  }

  scrollToBottom() {
    this.messagesContainer.scrollTo({
      top: this.messagesContainer.scrollHeight,
      behavior: 'smooth'
    });
  }

  async sendMessage(message) {
    this.addMessage(message, 'user', '../static/user.jpeg');
    this.showLoading();

    try {
      const response = await this.makePostRequest(message);
      this.hideLoading();
      
      if (response.error) {
        this.addMessage(response.error, 'error', '../static/Error.png');
      } else {
        this.addMessage(response.response, 'aibot', '../static/Bot_logo.png');
        this.history.push({ role: 'assistant', content: response.response });
        this.saveHistory();
      }
    } catch (error) {
      this.hideLoading();
      this.addMessage('Network error. Please try again.', 'error', '../static/Error.png');
      console.error('Error:', error);
    }
  }

  async makePostRequest(message) {
    const response = await fetch('/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  saveHistory() {
    sessionStorage.setItem('chatHistory', JSON.stringify(this.history));
  }

  loadHistory() {
    const saved = sessionStorage.getItem('chatHistory');
    if (saved) {
      this.history = JSON.parse(saved);
    }
  }

  clearHistory() {
    this.history = [];
    sessionStorage.removeItem('chatHistory');
    this.messagesContainer.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Chatbot();
});