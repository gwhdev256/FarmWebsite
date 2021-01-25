from db import db

class HoneyDataModel(db.Model):
    __tablename__= "Honey"

    id = db.Column(db.Integer, primary_key=True)
    HoneyType = db.Column(db.String, nullable=False)
    HoneySize = db.Column(db.Integer, nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    Price = db.Column(db.Float(precision=2), nullable=False)

    def __init__(self, honey_type, honey_size, quantity, price):
        self.HoneyType = honey_type
        self.HoneySize = honey_size
        self.Quantity = quantity
        self.Price = price

    def json(self):
        return {
                'HoneyType': self.HoneyType, 
                'HoneySize': self.HoneySize, 
                'Quantity': self.Quantity, 
                'Price': self.Price
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
    def find_by_honey_type(cls, honey_type):
        return cls.query.filter_by(HoneyType=honey_type)

    @classmethod
    def find_by_honey_size(cls, honey_size):
        return cls.query.filter_by(HoneySize=honey_size)

    @classmethod
    def find_by_honey_type_and_honey_size(cls, honey_type, honey_size):
        return cls.query.filter_by(HoneyType=honey_type, HoneySize=honey_size).first()
