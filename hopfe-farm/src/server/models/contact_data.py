from db import db

class ContactDataModel(db.Model):
    __tablename__ = "Contacts"

    id = db.Column(db.Integer, primary_key=True)
    ContactName = db.Column(db.String(500), unique = True, nullable = False)
    JobTitle = db.Column(db.String(500), nullable = False)
    PhoneNumber = db.Column(db.String(20))
    Email = db.Column(db.String(30))

    def __init__(self, ContactName, JobTitle, PhoneNumber, Email):
        self.ContactName = ContactName
        self.JobTitle = JobTitle
        self.PhoneNumber = PhoneNumber
        self.Email = Email

    def json(self):
        return {
                'id': self.id,
                'ContactName': self.ContactName, 
                'JobTitle': self.JobTitle,
                'PhoneNumber': self.PhoneNumber,
                'Email': self.Email
            }

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