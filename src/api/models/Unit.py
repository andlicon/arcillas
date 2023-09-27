from . import db

class Unit(db.Model):
    __tablename__ = 'unit'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    abbreviation = db.Column(db.String(5), unique=True, nullable=False)


    def __repr__(self):
        return f'<Unit {self.id}>'

    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'abbreviation': self.abbreviation
        }