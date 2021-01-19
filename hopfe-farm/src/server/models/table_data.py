from db import db

class TableDataModel(db.Model):
    __tablename__ = "table_data"

    id = db.Column(db.Integer, primary_key=True)
    table_name = db.Column(db.String(50), unique = True, nullable = False)
    table_headers = db.Column(db.String(100), unique = True, nullable = False)
    table_data = db.Column(db.String(1000))

    def __init__(self, table_name, table_headers, table_data):
        self.table_name = table_name
        self.table_headers = table_headers
        self.table_data = table_data

    def json(self):
        return {'table_name': self.table_name, 'table_headers': self.table_headers, 'table_data': self.table_data}

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
    def find_by_table_name(cls, name):
        return cls.query.filter_by(table_name=name).first()