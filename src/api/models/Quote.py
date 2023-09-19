from . import db
from ..utils.hourUtils import venezuelaNow

quote_items = db.Table('quote_items',
    db.Column('quote_id', db.Integer, db.ForeignKey('quote.id'), primary_key=True),
    db.Column('quote_item_id', db.Integer, db.ForeignKey('quote_item.id'), primary_key=True),
)

class Quote(db.Model):
    __tablename__ = 'quote'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=venezuelaNow())
    updated_at = db.Column(db.DateTime, default=venezuelaNow(), onupdate=venezuelaNow())
    items = db.relationship('QuoteItem', secondary=quote_items, lazy='subquery', backref=db.backref('quote', lazy=True))

    def serialize(self):
        return({
            'id': self.id,
            'user_id': self.user_id,
            'quote_list': list(map(lambda quote: quote.id, self.products)),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        })

    
    def __repr__(self):
        return(
            f'<Quote {self.id}>'
        )


class QuoteItem(db.Model):
    __tablename__ = 'quote_item'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
