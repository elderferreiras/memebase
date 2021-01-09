# app.py

from os import environ
import boto3
from flask import Flask, jsonify, request, render_template, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.sql.expression import func
from flask_security import Security, SQLAlchemyUserDatastore, hash_password, login_required
from flask_security.models import fsqla_v2 as fsqla
from werkzeug.utils import secure_filename


app = Flask(__name__,
            template_folder='templates',
            static_folder='templates/search/build/static'
            )
app.config['UPLOAD_FOLDER'] = '/tmp'

# Database setup
app.config.from_object('config.Config')
db = SQLAlchemy(app)
CORS(app)

# Security
fsqla.FsModels.set_db_info(db)


# Define models
class Role(db.Model, fsqla.FsRoleMixin):
    pass


class User(db.Model, fsqla.FsUserMixin):
    pass


# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)


# Create a user to test with
@app.before_first_request
def create_user():
    db.create_all()
    if len(User.query.all()) == 0:
        user_datastore.create_user(email=environ.get("ADMIN_EMAIL"),
                                   password=hash_password(environ.get("ADMIN_PASSWORD")))
        db.session.commit()


# Model
meme_word = db.Table('meme_word',
                     db.Column('meme_id', db.Integer, db.ForeignKey('meme.id'), primary_key=True),
                     db.Column('word_id', db.Integer, db.ForeignKey('word.id'), primary_key=True)
                     )


class Meme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=True)
    url = db.Column(db.Text, nullable=False)
    words = db.relationship('Word', secondary=meme_word, lazy='subquery')

    def __repr__(self):
        return '<Meme %r>' % self.url


class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(80), nullable=True)
    memes = db.relationship('Meme', secondary=meme_word, lazy='subquery')

    def __repr__(self):
        return '<Word %r>' % self.word


@app.route('/')
def search_index():
    initial_context = {
        'env': environ.get("FLASK_ENV")
    }
    return render_template('search/build/index.html', initial_context=initial_context)


@app.route("/get_results", methods=['GET'])
def get_results():
    search_query = request.args.get('q', '').lower()

    if search_query == '':
        results = db.session.query(Meme).order_by(func.random()).limit(6).all()
    else:
        results = Meme.query.join(Meme.words).filter_by(word=search_query).all()

    response = []
    for result in results:
        response.append({
            "id": result.id,
            "url": result.url,
            "title": result.title,
        })
    return jsonify({
        'q': search_query,
        'results': response
    }), 200


@app.route('/memes/index')
@login_required
def memes_index():
    data = {
        'env': environ.get("FLASK_ENV"),
        'url': environ.get('S3_URL'),
    }
    return render_template('memes/memes.html', data=data)


@app.route('/memes/create', methods=['GET', 'POST'])
@login_required
def memes_create():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        words = request.form['words']
        title = request.form['title']
        content_type = file.content_type
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        filename = secure_filename(file.filename)
        s3_client = boto3.client('s3')
        s3_client.put_object(
            ACL='public-read',
            Body=file,
            Bucket=environ.get("S3_BUCKET"),
            Key='{}/{}'.format(environ.get("FLASK_ENV"), filename),
            ContentType=content_type
        )

        word_instances = []
        for word in words.split(','):
            if len(word) > 0:
                word_instance = db.session.query(Word).filter_by(word=word).first()

                if word_instance is None:
                    word_instance = Word(word=word)
                    db.session.add(word_instance)

                if word_instance is not None:
                    word_instances.append(word_instance)
            else:
                continue

        new_meme = Meme(title=title, url=filename, words=word_instances)
        db.session.add(new_meme)
        db.session.commit()

        return {
            'statusCode': 200,
            'body': {
                'words': words,
                'file_path': '{}/{}'.format(environ.get("FLASK_ENV"), filename)
            }
        }
    else:
        return render_template('memes/create.html')


@app.route('/get_memes')
@login_required
def get_memes():
    results = []
    for meme in Meme.query.all():
        results.append({
            'id': meme.id,
            'title': meme.title,
            'url': meme.url
        })

    response = {
        'data': results
    }
    return jsonify(response), 200


@app.route('/get_words/id/<meme_id>')
@login_required
def get_words(meme_id):
    results = []
    for word in Word.query.filter(Word.memes.any(id=meme_id)):
        results.append({
            'id': word.id,
            'word': word.word,
        })

    response = {
        'data': results
    }

    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)
