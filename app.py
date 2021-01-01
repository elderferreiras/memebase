# app.py

from flask import Flask, jsonify, request, render_template
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('page.html')


@app.route("/search", methods=['GET'])
def search():
    search_query = request.args.get('q', '')

    return jsonify({
        'q': search_query,
        'results': []
    })


if __name__ == '__main__':
    app.run(debug=True)
