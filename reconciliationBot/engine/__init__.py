from flask import Flask, request, jsonify
from flask_cors import CORS
from engine.chat_engine import ChatEngine

app = Flask(__name__)
CORS(app)

chat_engine = ChatEngine()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json or {}
    session_id = str(data.get('sessionId', '100'))
    message = data.get('message', '')

    response_payload = chat_engine.process(session_id, message)
    return jsonify(response_payload)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)