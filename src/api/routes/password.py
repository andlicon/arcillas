from werkzeug.security import generate_password_hash
from base64 import b64encode

def create_password(password, salt):
    return generate_password_hash(password+salt, salt_length=16)
