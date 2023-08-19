from . import db
from ..utils.hourUtils import venezuelaNow

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    usage = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, default=venezuelaNow())
    upgrated_at = db.Column(db.DateTime, default=venezuelaNow(), onupdate=venezuelaNow())


    def __repr__(self):
        return f'<Product {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'usage': self.usage,
            'created_at': self.created_at,
            'upgrated_at': self.upgrated_at
        }
