from flask import Flask, url_for,flash, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, redirect
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_mail import Mail
import json
mail = Mail()
app = Flask(__name__)
mail.init_app(app)

app.config['SECRET_KEY'] =  '9876ytgbnfmyui8ru765454'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:test@127.0.0.1/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = "Sdadsdasd43"

app.debug = True
db = SQLAlchemy(app)


# Define models
roles_users = db.Table('roles_users', db.Column('user_id', db.Integer(), db.ForeignKey('user.id')), db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), unique=True)
    x = db.Column(db.String(50))
    y = db.Column(db.String(50))
    kategory = db.Column(db.Integer)

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)


@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/profile/<email>')
@login_required
def profile(email):
    user = User.query.filter_by(email = email).first()
    return render_template('profile.html', user=user)

# @app.route('/product', methods=['POST'])
# def get_data():
#     if request.method == 'POST':
#         data = json.loads(request.data)
#         ss = data['category']
#         ss = "I received : "
#         return str(ss)
#     return render_template('Produkt1.html')

@app.route('/post_user', methods=['POST'])
def post_user():
    user = User(request.form['username'], request.form['email'])
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
