from flask import Flask, request, jsonify, send_from_directory, render_template_string
import nltk
from nltk.chat.util import Chat, reflections

app = Flask(__name__)

# Sample pairs for NLP chat
pairs = [
    ['(hi|hello|hey)', ['Hello! How can I help you today?']],
    ['(.*) your name?', ['My name is SupportBot.']],
    ['(how are you|how are you doing)', ['I am just a bot, but I\'m here to help you!']],
    ['(.*) price of (.*)', ['The price of %2 depends on the market. Can you be more specific?']],
    ['(thank you|thanks)', ['You\'re welcome!']],
    ['(.*)', ['I am not sure I understand. Can you please elaborate?']]
]

# Initialize the chatbot
chat = Chat(pairs, reflections)

@app.route('/')
def home():
    return render_template_string(open('index.html').read())

@app.route('/styles.css')
def serve_css():
    return send_from_directory('.', 'styles.css')

@app.route('/script.js')
def serve_js():
    return send_from_directory('.', 'script.js')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    
    # Get chatbot response
    response = chat.respond(user_message.lower())
    return jsonify({'response': response})

if __name__ == '__main__':
    nltk.download('punkt')  # Download required NLTK data
    app.run(debug=True)


