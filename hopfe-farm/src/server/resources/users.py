from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.users import UserModel
    

_global_parser = reqparse.RequestParser()
_global_parser.add_argument('username',
    type=str,
    required=True,
    help="This field cannot be left blank!"
)
_global_parser.add_argument('password',
    type=str,
    required=True,
    help="This field cannot be left blank!"
)


class UserRegister(Resource):
    def post(self):
        data = _global_parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"message": "A user with that username already exists."}, 404

        hashedpass = UserModel.generate_hash(data['password'])
        user = UserModel(data['username'], hashedpass)
        try:
            user.save_to_db()        
            return {"message": "User '{}' created successfully.".format(data['username'])}, 201
        except:
            return {"message": "Something went wrong."}, 500


class User(Resource):
    @classmethod
    @jwt_required
    def get(cls):
        user_id = get_jwt_identity()
        user = UserModel.find_by_id(user_id)
        if user:
            return user.json(), 200
        return {"message": "User not found."}, 404

    @classmethod
    @jwt_required
    def delete(cls):
        user_id = get_jwt_identity()
        user = UserModel.find_by_id(user_id)
        if user:
            user.delete_from_db()             
            return {"message": "User deleted successfully."}, 200           
        return {"message": "User not found."}, 404


class UserLogin(Resource):
    @classmethod
    def post(cls):
        data = _global_parser.parse_args()
        user = UserModel.find_by_username(data['username'])
        if user and UserModel.verify_hash(data['password'], user.password):
            access_token = create_access_token(identity=user.id)
            return {
                'access_token': access_token
            }, 200
        return {"message": "Invalid credentials."}, 401