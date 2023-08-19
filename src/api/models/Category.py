from . import db

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)


    def __repr__(self):
        return f'<Category {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name
        }