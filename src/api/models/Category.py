from . import db

class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)


    def __repr__(self):
        return f'<Category {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name
        }


class Sub_Category(db.Model):
    __tablename__ = "sub_category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)


    def __repr__(self):
        return f'<Sub_Category {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name
        }