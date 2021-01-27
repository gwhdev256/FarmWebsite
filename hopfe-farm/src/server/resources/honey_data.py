from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.honey_data import HoneyDataModel


class CreateHoneyData(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('HoneyType',
        type=str,
        required=True,
        help="Body must contain HoneyType (ex. Wildflower/Alfalfa)."
    )
    parser.add_argument('HoneySize',
        type=int,
        required=True,
        help="Body must contain a HoneySize (in ml)."
    )
    parser.add_argument('Quantity',
        type=int
    )
    parser.add_argument('Price',
        type=float
    )

    @jwt_required
    def post(self):
        data = HoneyData.parser.parse_args()

        if HoneyDataModel.find_by_honey_type_and_honey_size(data['HoneyType'], data['HoneySize']):
            return {'message': 'Data for that honey type and size already exists.'}, 404

        new_data = HoneyDataModel(data['HoneyType'], data['HoneySize'], data['Quantity'], data['Price'])
        try:
            new_data.save_to_db()
        except:
            return {"message": "An error occurred while inserting the item."}, 500

        return {'message': 'Data added successfully.'}, 201


class HoneyData(Resource):
    def get(self, _id):
        honey = HoneyDataModel.find_by_id(_id)
        if honey:
            return honey.json()
        return {'message': 'id not found'}, 404

    @jwt_required
    def delete(self):
        honey = HoneyDataModel.find_by_id(_id)
        if honey:
            honey.delete_from_db()
            return {'message': 'Level successfully deleted.'}, 200
        return {'message': 'id not found'}, 404


class HoneyList(Resource):
    @jwt_required
    def get(self):
        honey_categories = [honey.json() for honey in HoneyDataModel.find_all()]
        return {'honey': honey_categories}, 200