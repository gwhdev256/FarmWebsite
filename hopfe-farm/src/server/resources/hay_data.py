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
        type=int
    )
    parser.add_argument('Price',
        type=float
    )

    @jwt_required
    def post(self):
        data = CreateHayData.parser.parse_args()

        if HayDataModel.find_by_hay_type_and_bale_quality(data['HayType'], data['BaleQuality']):
            return {'message': 'Data for that hay type and quality already exists.'}, 404

        new_data = HayDataModel(data['HayType'], data['BaleQuality'], data['Quantity'], data['Price'])
        try:
            new_data.save_to_db()
        except:
            return {"message": "An error occurred while inserting the item."}, 500

        return {'message': 'Data added successfully.'}, 201


class HayData(Resource):
    def get(self, _id):
        hay = HayDataModel.find_by_id(_id)
        if hay:
            return hay.json()
        return {'message': 'id not found'}, 404

    @jwt_required
    def delete(self):
        hay = HayDataModel.find_by_id(_id)
        if hay:
            hay.delete_from_db()
            return {'message': 'Level successfully deleted.'}, 200
        return {'message': 'id not found'}, 404


class HayList(Resource):
    @jwt_required
    def get(self):
        hay_categories = [hay.json() for hay in HayDataModel.find_all()]
        return {'hay': hay_categories}, 200