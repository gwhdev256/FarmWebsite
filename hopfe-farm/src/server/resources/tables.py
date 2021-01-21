from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.tables import TablesModel


class CreateTable(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('table_name',
        type=str,
        required=True,
        help="Body must contain table_name"
    )
    # parser.add_argument('table_headers',
    #     type=str,
    #     required=True,
    #     help="Body must contain table_headers"
    # )
    # parser.add_argument('table_data',
    #     type=str,
    # )

    @jwt_required
    def post(self):
        data = CreateTable.parser.parse_args()

        if TablesModel.find_by_table_name(data["table_name"]):
            return {"message": "A table with that name already exists."}, 404

        # table = TablesModel(data["table_name"], data["table_headers"], data["table_data"])
        table = TablesModel(data["table_name"])

        try:
            table.save_to_db()
            return {"message": "Table '{}' created successfully.".format(data['table_name'])}, 201
        except:
            return {"message": "Something went wrong."}, 500

class Table(Resource):
    @classmethod
    def get(self, tablename):
        table = TablesModel.find_by_table_name(tablename)

        if table:
            return table.json(), 200
        return {"message": "Table not found."}, 400

    @classmethod
    @jwt_required
    def delete(self, tablename):
        table = TablesModel.find_by_table_name(tablename)

        if table:
            table.delete_from_db()
            return {"message": "Table '{}' deleted successfully.".format(tablename)}, 200
        return {"message": "Table not found."}, 404
        