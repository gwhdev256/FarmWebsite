from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.hay_data import HayDataModel


class CreateHayData(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('HayType',
        type=str,
        required=True,
        help="Body must contain HayType (ex. 30% Alfalfa)."
    )
    parser.add_argument('BaleQuality',
        type=str,
        required=True,
        help="Body must contain a BaleQuality (No Rain / Some Rain / Heavy Rain)."
    )
    parser.add_argument('Quantity',
        type=int,
        required=True,
        help="Body must contain a Quantity."
    )
    parser.add_argument('Price',
        type=float,
        required=True,
        help="Body must contain Price."
    )
    parser.add_argument('NewHayType',
        type=str
    )
    parser.add_argument('NewBaleQuality',
        type=str
    )

    @jwt_required
    def post(self):
        data = CreateHayData.parser.parse_args()

        if HayDataModel.find_by_hay_type_and_bale_quality(data['HayType'], data['BaleQuality']):
            return {'message': 'Data for that hay type and quality already exists.'}, 404

        hay_data = HayDataModel(data['HayType'], data['BaleQuality'], data['Quantity'], data['Price'])
        try:
            hay_data.save_to_db()
        except:
            return {"message": "An error occurred while inserting the hay entry."}, 500

        return {'message': 'Data added successfully.',
                'added_entry': hay_data.json()
        }, 201
    
    @jwt_required
    def put(self):
        data = CreateHayData.parser.parse_args()
        
        hay_data = HayDataModel.find_by_hay_type_and_bale_quality(data['HayType'], data['BaleQuality'])

        if hay_data:
            if data['NewHayType'] and data['NewBaleQuality']:
                if HayDataModel.find_by_hay_type_and_bale_quality(data['NewHayType'], data['NewBaleQuality']):
                    return {'message': "An entry with a hay type of '{}' and bale quality of '{}' already exists.".format(data['NewHayType'], data['NewBaleQuality'])}, 404
                else:
                    try:
                        hay_data.HayType = data['NewHayType']
                        hay_data.BaleQuality = data['NewBaleQuality']
                        hay_data.Quantity = data['Quantity']
                        hay_data.Price = data['Price']
                        hay_data.save_to_db()
                        return {'message': 'Hay entry updated successfully.',
                                'changed_entry': hay_data.json()
                        }, 200
                    except:
                        return {'message': 'An error occurred while inserting the hay entry.'}, 500
            else:
                return {'message': 'Please provide NewHayType and NewBaleQuality in body.'}, 400
        else:
            if data['NewHayType'] or data['NewBaleQuality']:
                return {'message': "An entry with a hay type of '{}' and bale quality of '{}' doesn't exist and cannot be updated.".format(data['HayType'], data['BaleQuality'])}, 404
            else:
                new_hay_data = HayDataModel(data['HayType'], data['BaleQuality'], data['Quantity'], data['Price'])
                new_hay_data.save_to_db()
                return {'message': 'Hay data created successfully.',
                        'added_entry': new_hay_data.json()
                }, 201


class HayData(Resource):
    def get(self, _id):
        hay = HayDataModel.find_by_id(_id)
        if hay:
            return hay.json()
        return {'message': 'Hay entry not found'}, 404

    @jwt_required
    def delete(self, _id):
        hay = HayDataModel.find_by_id(_id)
        if hay:
            hay.delete_from_db()
            return {'message': 'Hay entry successfully deleted.'}, 200
        return {'message': 'Hay entry not found'}, 404


class HayList(Resource):
    def get(self):
        hay_categories = [hay.json() for hay in HayDataModel.find_all()]
        if hay_categories:
            return {'hay': hay_categories}, 200
        return {'message': 'No hay entries found'}, 404

class TestHayFuncs(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('HayType',
        type=str,
        required=True,
        help="Body must contain HayType (ex. 30% Alfalfa)."
    )
    parser.add_argument('BaleQuality',
        type=str,
        required=True,
        help="Body must contain a BaleQuality (No Rain / Some Rain / Heavy Rain)."
    )

    @jwt_required
    def delete(self):
        data = TestHayFuncs.parser.parse_args()
        
        hay_data = HayDataModel.find_by_hay_type_and_bale_quality(data['HayType'], data['BaleQuality'])

        if hay_data:
            hay_data.delete_from_db()
            return {'message': 'Hay entry successfully deleted.'}, 200
        return {'message': 'Hay entry not found.'}, 404