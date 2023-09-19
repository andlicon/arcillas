from . import db
from .Category import Category
from ..utils.hourUtils import venezuelaNow

class Product(db.Model):
    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    usage = db.Column(db.String(250))
    image_url = db.Column(db.String(250), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=venezuelaNow())
    updated_at = db.Column(db.DateTime, default=venezuelaNow(), onupdate=venezuelaNow())
    # fk
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'), nullable=False)

    # relationships
    categorys = db.relationship('Category', backref='product')
    units = db.relationship('Unit', backref='product')
    quote_items = db.relationship('QuoteItem', backref='product')


    def __repr__(self):
        return f'<Product {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category_id': self.category_id,
            'usage': self.usage,
            'unit_id': self.unit_id,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
