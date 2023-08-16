from werkzeug.security import generate_password_hash, check_password_hash

def create_password(password, salt):
    return generate_password_hash(password+salt, salt_length=16)

def check_password(passwordUser, passwordInput):
    return check_password_hash(passwordUser, passwordInput)