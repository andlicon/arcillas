from ..models.User import User

def validate_new_user(user):
    """
    Receive an user, then look for some match at data base in each one unique column.
    return a tuple with the result
    """
    is_duplicated = User.query.filter_by(email=user.email).one_or_none()
    if is_duplicated  is not None:
        return False, 'There is an user with the Email especified'

    return True, 'Ok'