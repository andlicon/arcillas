from . import db
from .UserStatus import UserStatus
from .Role import Role

# It represents any user, Here you have all information about a user.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(250), unique=False, nullable=False)
    status = db.Column(db.Enum(UserStatus), unique=False, nullable=False)
    role = db.Column(db.Enum(Role), unique=False, nullable=False)
    password = db.Column(db.String(110), unique=False, nullable=False)
    salt = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "status": self.status.value,
            "role": self.role.value
        }