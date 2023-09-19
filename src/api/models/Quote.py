from . import db
from ..utils.hourUtils import venezuelaNow

products = db.Table('products',
    db.Column('quote_id', db.Integer, db.ForeignKey('quote.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True),
    db.Column('amount', db.Integer)
)

class Quote(db.Model):
    __tablename__ = 'quote'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=venezuelaNow())
    updated_at = db.Column(db.DateTime, default=venezuelaNow(), onupdate=venezuelaNow())
    products = db.relationship('Product', secondary=products, lazy='subquery', backref=db.backref('quote', lazy=True))

    def serialize(self):
        return({
            'id': self.id,
            'user_id': self.user_id,
            'products': list(map(lambda product: product.id, self.products)),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        })

    
    def __repr__(self):
        return(
            f'<Quote {self.id}>'
        )