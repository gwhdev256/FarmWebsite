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
    )
    parser.add_argument('Price',
        type=float,
    )

    @jwt_required
    def post(self):
        data = CreateHoneyData.parser.parse_args()

        if HoneyDataModel.find_by_honey_type_and_honey_size(data['HoneyType'], data['HoneySize']):
            return {'message': 'Data for that honey type and size already exists.'}, 404

        new_data = HoneyDataModel(data['HoneyType'], data['HoneySize'], data['Quantity'], data['Price'])
        new_data.save_to_db()

        return {'message': 'Data added successfully.'}, 200