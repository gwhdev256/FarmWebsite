from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.honey_data import HoneyDataModel


class CreateFieldData(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('row_index',
        type=int,
        required=True,
        help="Body must contain row_index"
    )
    parser.add_argument('column_index',
        type=int,
        required=True,
        help="Body must contain column_index"
    )
    parser.add_argument('field_data',
        type=str
    )

    @jwt_required
    def post(self):
        data = CreateFieldData.parser.parse_args()

        if HoneyDataModel.find_by_column_index_and_row_index(data['column_index'], data['row_index']):
            return {'message': 'Data for that field already exists.'}, 404

        new_data = HoneyDataModel(data['row_index'], data['column_index'], data['field_data'])
        new_data.save_to_db()

        return {'message': 'New field data added successfully.'}, 200