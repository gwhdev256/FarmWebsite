from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.contact_data import ContactDataModel


class ContactList(Resource):
    def get(self):
        contact_categories = [contact.json() for contact in ContactDataModel.find_all()]
        if (contact_categories):
            return {'contact_info': contact_categories}, 200
        return{"message": "Contact data not found."}, 404


# uncomment any of the following and add corresponding resource to app.py to use

# class CreateContactData(Resource):
#     parser = reqparse.RequestParser()
#     parser.add_argument('ContactName',
#         type=str,
#         required=True,
#         help="Body must contain ContactName"
#     )
#     parser.add_argument('JobTitle',
#         type=str,
#         required=True,
#         help="Body must contain JobTitle"
#     )
#     parser.add_argument('PhoneNumber',
#         type=str
#     )
#     parser.add_argument('Email',
#         type=str
#     )
#     parser.add_argument('_id',
#         type=int
#     )

#     @jwt_required
#     def post(self):
#         data = CreateContactData.parser.parse_args()

#         contact_data = ContactDataModel(data["ContactName"], data["JobTitle"], data["PhoneNumber"], data["Email"])

#         try:
#             contact_data.save_to_db()
#             return {"message": "Contact data added successfully"}, 201
#         except:
#             return {"message": "Something went wrong."}, 500

# class ContactData(Resource):
#     @classmethod
#     def get(cls, _id):
#         contact_data = ContactDataModel.find_by_id(_id)

#         if contact_data:
#             return contact_data.json(), 200
#         return {"message": "Contact data not found."}, 400

#     @classmethod
#     @jwt_required
#     def delete(cls, _id):
#         contact_data = ContactDataModel.find_by_id(_id)

#         if contact_data:
#             contact_data.delete_from_db()
#             return {"message": "Contact data deleted successfully."}, 200
#         return {"message": "Contact data not found."}, 404