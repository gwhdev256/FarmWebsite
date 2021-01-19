from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from db import db

from resources.users import UserRegister, User, UserLogin
from resources.table_data import Table, CreateTable

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True

app.secret_key = 'development'

api = Api(app)
CORS(app)

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWTManager(app)

api.add_resource(UserRegister, '/register')
api.add_resource(User, '/user')
api.add_resource(UserLogin, '/login')
api.add_resource(Table, '/table/<string:tablename>')
api.add_resource(CreateTable, '/create')

if __name__ == '__main__':
    print("--- Starting", __file__)
    db.init_app(app)
    app.run(debug=True, use_reloader=True, port=5000)