from db import db

class HayDataModel(db.Model):
    __tablename__= "Hay"

    id = db.Column(db.Integer, primary_key=True)
    HayType = db.Column(db.String, nullable=False)
    BaleQuality = db.Column(db.String, nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    Price = db.Column(db.Float(precision=2), nullable=False)

    def __init__(self, hay_type, bale_quality, quantity, price):
        self.HayType = hay_type
        self.BaleQuality = bale_quality
        self.Quantity = quantity
        self.Price = price

    def json(self):
        return {
                'id': self.id,
                'HayType': self.HayType, 
                'BaleQuality': self.BaleQuality, 
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
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_hay_type(cls, hay_type):
        return cls.query.filter_by(HayType=hay_type)

    @classmethod
    def find_by_bale_quality(cls, bale_quality):
        return cls.query.filter_by(BaleQuality=bale_quality)

    @classmethod
    def find_by_hay_type_and_bale_quality(cls, hay_type, bale_quality):
        return cls.query.filter_by(HayType=hay_type, BaleQuality=bale_quality).first()
