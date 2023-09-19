from . import db
from .QuoteStatus import QuoteStatus
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
    status = db.Column(db.Enum(QuoteStatus), default=QuoteStatus.PENDING)
    items = db.relationship('QuoteItem', secondary=quote_items, lazy='subquery', backref=db.backref('quote', lazy=True))

    def serialize(self):
        return({
            'id': self.id,
            'user_id': self.user_id,
            'status': self.status.value,
            'quote_items': list(map(lambda item: item.id, self.items)),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        })

    
    def __repr__(self):
        return(
            f'<Quote {self.id}>'
        )
