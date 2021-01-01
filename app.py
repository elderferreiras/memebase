# app.py

from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route("/")
def index():
    return "Memes!"


@app.route("/search")
def search():
    search_query = request.json.get('q')

    return jsonify({
        'q': search_query,
        'results': []
    })
