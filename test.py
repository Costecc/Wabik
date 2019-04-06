from flask import Flask, url_for,flash, request
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, redirect

app = Flask(__name__)
app.config['SECRET KEY'] =  '9876ytgbnfmyui8ru765454'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:test@127.0.0.1/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True
db = SQLAlchemy(app)


class User(db.Model):
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), primary_key=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


@app.route('/')
def index():
    myUser = User.query.all()
    oneItem = User.query.filter_by(username = "test2").all()
    return render_template('add_user.html', myUser=myUser, oneItem=oneItem)


@app.route('/post_user', methods=['POST'])
def post_user():
    user = User(request.form['username'], request.form['email'])
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
