from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from db import db

from resources.users import UserRegister, User, UserLogin
from resources.contact_data import ContactData, CreateContactData, ContactList
from resources.honey_data import CreateHoneyData, HoneyData, HoneyList
from resources.hay_data import CreateHayData, HayData, HayList

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

app.secret_key = 'development'

api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWTManager(app)

CORS(app)

api.add_resource(UserRegister, '/register')
api.add_resource(User, '/user')
api.add_resource(UserLogin, '/login')
api.add_resource(CreateContactData, '/createcontact')
api.add_resource(ContactData, '/contact/<int:_id>')
api.add_resource(ContactList, '/contactlist')
api.add_resource(CreateHoneyData, '/createhoney')
api.add_resource(HoneyData, '/honey/<int:_id>')
api.add_resource(HoneyList, '/honeylist')
api.add_resource(CreateHayData, '/createhay')
api.add_resource(HayData, '/hay/<int:_id>')
api.add_resource(HayList, '/haylist')

if __name__ == '__main__':
    print("--- Starting", __file__)
    db.init_app(app)
    app.run(debug=True, use_reloader=True, port=5000)