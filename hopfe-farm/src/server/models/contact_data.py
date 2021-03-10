from db import db

class ContactDataModel(db.Model):
    __tablename__ = "Contacts"

    id = db.Column(db.Integer, primary_key=True)
    contact_name = db.Column(db.String(500), unique = True, nullable = False)
    job_title = db.Column(db.String(500), nullable = False)
    phone_number = db.Column(db.String(20))
    email = db.Column(db.String(30))

    def __init__(self, contact_name, job_title, phone_number, email):
        self.contact_name = contact_name
        self.job_title = job_title
        self.phone_number = phone_number
        self.email = email

    def json(self):
        return {
                'contact_name': self.contact_name, 
                'job_title': self.job_title,
                'phone_number': self.phone_number,
                'email': self.email
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