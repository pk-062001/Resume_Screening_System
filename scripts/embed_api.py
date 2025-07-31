# scripts/embed_api.py

from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow calls from Node.js

# Load model once
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/embed', methods=['POST'])
def embed():
    data = request.get_json()
    sentence = data.get("text")

    if not sentence:
        return jsonify({"error": "Missing 'text' in request"}), 400

    try:
        embedding = model.encode(sentence).tolist()
        return jsonify({"embedding": embedding})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000)



