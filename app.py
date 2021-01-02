# app.py

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

from login import login_page

app = Flask(__name__, template_folder='templates/build/', static_folder='templates/build/static')
app.register_blueprint(login_page, url_prefix='/login')
CORS(app)


@app.route('/')
def search_index():
    return render_template('index.html')


@app.route("/get_results", methods=['GET'])
def get_results():
    search_query = request.args.get('q', '')

    return jsonify({
        'q': search_query,
        'results': []
    })


if __name__ == '__main__':
    app.run(debug=True)
