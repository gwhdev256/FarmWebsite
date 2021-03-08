from db import db

class ContactDataModel(db.Model):
    __tablename__ = "Contacts"

    id = db.Column(db.Integer, primary_key=True)
    stored_string = db.Column(db.String(500), unique = True, nullable = False)

    def __init__(self, stored_string):
        self.stored_string = stored_string

    def json(self):
        return {'stored_string': self.stored_string}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()