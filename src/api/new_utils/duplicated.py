from ..models.User import User

def find_user(user):
    is_duplicated = User.query.filter_by(email=user.email).one_or_none()
    if is_duplicated  is not None:
        return 'There is an user with that Email'

    return None