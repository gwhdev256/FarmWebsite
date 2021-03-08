from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.contact_data import ContactDataModel


class CreateContactData(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('stored_string',
        type=str,
        required=True,
        help="Body must contain table_name"
    )
    parser.add_argument('_id',
        type=int
    )

    @jwt_required
    def post(self):
        data = CreateContactData.parser.parse_args()

        if ContactDataModel.find_by_id(data["_id"]):
            return {"message": "Contact data with that id already exists."}, 404

        contact_data = ContactDataModel(data["stored_string"])

        try:
            contact_data.save_to_db()
            return {"message": "Table '{}' created successfully.".format(data['table_name'])}, 201
        except:
            return {"message": "Something went wrong."}, 500

class ContactData(Resource):
    @classmethod
    def get(cls, _id):
        contact_data = ContactDataModel.find_by_id(_id)

        if contact_data:
            return contact_data.json(), 200
        return {"message": "Contact data not found."}, 400

    @classmethod
    @jwt_required
    def delete(cls, _id):
        contact_data = ContactDataModel.find_by_id(_id)

        if contact_data:
            contact_data.delete_from_db()
            return {"message": "Contact data deleted successfully."}, 200
        return {"message": "Contact data not found."}, 404

class ContactList(Resource):
    def get(self):
        contact_categories = [contact.json() for contact in ContactDataModel.find_all()]
        return {'contact_info': contact_categories}, 200
        