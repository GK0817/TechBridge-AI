from flask import Flask, request, jsonify
from flask_cors import CORS  # 👈 Added
from engine.chat_engine import ChatEngine

app = Flask(__name__)
CORS(app)  # 👈 Added (Teeno lines top par add kar do)

chat_engine = ChatEngine()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    session_id = data.get('sessionId')
    message = data.get('message')

    response = chat_engine.process_message(session_id, message)
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000, debug=True)