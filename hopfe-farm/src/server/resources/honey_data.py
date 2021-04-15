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
        type=int,
        required=True,
        help="Body must contain a Quantity."
    )
    parser.add_argument('Price',
        type=float,
        required=True,
        help="Body must contain a Price."
    )
    parser.add_argument('NewHoneyType',
        type=str
    )
    parser.add_argument('NewHoneySize',
        type=int
    )

    @jwt_required
    def post(self):
        data = CreateHoneyData.parser.parse_args()

        if HoneyDataModel.find_by_honey_type_and_honey_size(data['HoneyType'], data['HoneySize']):
            return {'message': 'Data for that honey type and size already exists.'}, 404

        new_data = HoneyDataModel(data['HoneyType'], data['HoneySize'], data['Quantity'], data['Price'])
        try:
            new_data.save_to_db()
        except:
            return {"message": "An error occurred while inserting the item."}, 500

        return {'message': 'Data added successfully.'}, 201

    @jwt_required
    def put(self):
        data = CreateHoneyData.parser.parse_args()
        
        honey_data = HoneyDataModel.find_by_honey_type_and_honey_size(data['HoneyType'], data['HoneySize'])

        if honey_data:
            if data['NewHoneyType'] and data['NewHoneySize']:
                if HoneyDataModel.find_by_honey_type_and_honey_size(data['NewHoneyType'], data['NewHoneySize']):
                    return {'message': "An entry with a honey type of '{}' and honey size of '{}' already exists.".format(data['NewHoneyType'], data['NewHoneySize'])}, 404
                else:
                    try:
                        honey_data.HoneyType = data['NewHoneyType']
                        honey_data.HoneySize = data['NewHoneySize']
                        honey_data.Quantity = data['Quantity']
                        honey_data.Price = data['Price']
                        honey_data.save_to_db()
                        return {'message': 'Honey entry updated successfully.',
                                'changed_entry': honey_data.json()
                        }, 200
                    except:
                        return {'message': 'An error occurred while inserting the honey entry.'}, 500
            else:
                return {'message': 'Please provide NewHoneyType and NewHoneySize in body.'}, 400
        else:
            if data['NewHoneyType'] or data['NewHoneySize']:
                return {'message': "An entry with a honey type of '{}' and honey size of '{}' doesn't exist and cannot be updated.".format(data['HoneyType'], data['HoneySize'])}, 404
            else:
                honey_data = HoneyDataModel(data['HoneyType'], data['HoneySize'], data['Quantity'], data['Price'])
                honey_data.save_to_db()
                return {'message': 'Honey data created successfully.',
                        'changed_entry': honey_data.json()
                }, 201


class HoneyData(Resource):
    def get(self, _id):
        honey = HoneyDataModel.find_by_id(_id)
        if honey:
            return honey.json()
        return {'message': 'id not found'}, 404

    @jwt_required
    def delete(self, _id):
        honey = HoneyDataModel.find_by_id(_id)
        if honey:
            honey.delete_from_db()
            return {'message': 'Honey entry successfully deleted.'}, 200
        return {'message': 'id not found'}, 404


class HoneyList(Resource):
    def get(self):
        honey_categories = [honey.json() for honey in HoneyDataModel.find_all()]
        return {'honey': honey_categories}, 200

class TestHoneyFuncs(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('HoneyType',
        type=str,
        required=True,
        help="Body must contain HayType (ex. 30% Alfalfa)."
    )
    parser.add_argument('HoneySize',
        type=str,
        required=True,
        help="Body must contain a BaleQuality (No Rain / Some Rain / Heavy Rain)."
    )

    @jwt_required
    def delete(self):
        data = TestHoneyFuncs.parser.parse_args()
        
        honey_data = HoneyDataModel.find_by_honey_type_and_honey_size(data['HoneyType'], data['HoneySize'])

        if honey_data:
            honey_data.delete_from_db()
            return {'message': 'Honey entry successfully deleted.'}, 200
        return {'message': 'Honey entry not found.'}, 404