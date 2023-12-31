from . import db
from .QuoteStatus import QuoteStatus
from ..utils.hourUtils import venezuelaNow

class QuoteItem(db.Model):
    __tablename__ = 'quote_item'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=venezuelaNow())
    updated_at = db.Column(db.DateTime, default=venezuelaNow(), onupdate=venezuelaNow())
    amount = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer)
    status = db.Column(db.Enum(QuoteStatus), nullable=False, default=QuoteStatus.PENDING)


    def serialize(self):
        return({
            'id': self.id,
            'product': self.product.serialize(),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'amount': self.amount,
            'price': self.price,
            'status': self.status.value
        })


    def __repr__(self):
        return(
            f'<QuoteItem {self.id}>'
        )