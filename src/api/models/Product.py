from . import db
from .Category import Category, Sub_Category
from ..utils.hourUtils import venezuelaNow

class Product(db.Model):
    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    usage = db.Column(db.String(250))
    image_url = db.Column(db.String(250), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=venezuelaNow())
    upgrated_at = db.Column(db.DateTime, default=venezuelaNow(), onupdate=venezuelaNow())
    # fk
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    sub_category_id = db.Column(db.Integer, db.ForeignKey('sub_category.id'), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'), nullable=False)

    # relationships
    categorys = db.relationship('Category', backref='product')
    sub_categorys = db.relationship('Sub_Category', backref='product')
    units = db.relationship('Unit', backref='product')


    def __repr__(self):
        return f'<Product {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'usage': self.usage,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'upgrated_at': self.upgrated_at
        }
