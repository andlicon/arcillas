from . import Enum

class UserStatus(Enum):
    ACTIVE = 'activo'
    INACTIVE = 'inactivo'

    def get_value(string):
        if string is None:
            return None
            
        string = string.lower()
        
        if string == 'activo':
            return UserStatus.ACTIVE
        elif string == 'inactivo':
            return UserStatus.INACTIVE

        return None