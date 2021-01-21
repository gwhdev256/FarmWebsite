from db import db

class HoneyDataModel(db.Model):
    __tablename__= "honey"

    id = db.Column(db.Integer, primary_key=True)
    row_index = db.Column(db.Integer, nullable=False)
    column_index = db.Column(db.Integer, nullable=False)
    field_data = db.Column(db.String)

    def __init__(self, row_index, column_index, field_data)
        self.row_index = row_index
        self.column_index = column_index
        self.field_data = field_data

    def json(self):
        return {'row_index': self.row_index, 'column_index': self.column_index, 'field_data': self.field_data}

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
    def find_by_row_index(cls, row)
        return cls.query.filter_by(row_index=row)

    @classmethod
    def find_by_column_index(cls, col)
        return cls.query.filter_by(column_index=col)

    @classmethod
    def find_by_column_index_and_row_index(cls, col, row)
        return cls.query.filter_by(column_index=col, row_index=row).first()
