from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch
import logging
from typing import List, Dict, Any

app = Flask(__name__)
app.secret_key = "your-secret-key-here-change-in-production"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['MAX_HISTORY'] = 8

CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_NAME = "facebook/blenderbot-400M-distill"

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
    logger.info(f"Model {MODEL_NAME} loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    raise

class ChatbotManager:
    def __init__(self, max_history: int = 8):
        self.max_history = max_history
    
    def get_history(self) -> List[str]:
        return session.get('history', [])
    
    def update_history(self, user_input: str, bot_response: str) -> None:
        history = self.get_history()
        history.extend([user_input, bot_response])
        
        if len(history) > self.max_history * 2:
            history = history[-(self.max_history * 2):]
        
        session['history'] = history
    
    def generate_response(self, prompt: str, history: List[str]) -> str:
        context = " ".join(history[-self.max_history:]) if history else ""
        full_prompt = f"{context} {prompt}" if context else prompt
        
        inputs = tokenizer(full_prompt, return_tensors="pt", truncation=True, max_length=128)
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=100,
                min_length=10,
                do_sample=True,
                top_k=50,
                top_p=0.92,
                temperature=0.75,
                no_repeat_ngram_size=3,
                early_stopping=True
            )
        
        return tokenizer.decode(outputs[0], skip_special_tokens=True)

chatbot_manager = ChatbotManager(max_history=app.config['MAX_HISTORY'])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data received'}), 400
        
        prompt = data.get('prompt', '').strip()
        
        if not prompt:
            return jsonify({'error': 'Empty prompt received'}), 400
        
        history = chatbot_manager.get_history()
        
        try:
            response = chatbot_manager.generate_response(prompt, history)
            chatbot_manager.update_history(prompt, response)
            
            return jsonify({
                'response': response,
                'status': 'success'
            })
            
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return jsonify({
                'error': 'Failed to generate response. Please try again.',
                'status': 'error'
            }), 500
            
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/clear', methods=['POST'])
def clear_history():
    try:
        session.pop('history', None)
        return jsonify({
            'status': 'success',
            'message': 'History cleared'
        })
    except Exception as e:
        logger.error(f"Error clearing history: {e}")
        return jsonify({'error': 'Failed to clear history'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model': MODEL_NAME,
        'max_history': app.config['MAX_HISTORY']
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)