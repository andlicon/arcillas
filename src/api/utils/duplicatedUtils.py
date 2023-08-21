from ..models.User import User
from ..models.Category import Category

def validate_new_user(email):
    """
    Receive an email, then look for some match at data base in each one unique column.
    return a tuple with the result
    """
    is_duplicated = User.query.filter_by(email=email).one_or_none()
    if is_duplicated is not None:
        return False, 'Existe un usuario con el email indicado'

    return True, 'Ok'


def validate_new_category(name):
    """
    Receive a name, then look for some match at data base in each one unique column.
    return a tuple with the result
    """
    is_valid = Category.query.filter_by(name=name).one_or_none()
    if is_valid is not None:
        return False, 'Existe una categoria con el nombre indicado'

    return True, 'Ok'