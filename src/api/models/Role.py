from . import Enum

class Role(Enum):
    ADMIN = 'administrador'
    EMPLOYED = 'empleado'

    def get_value(string):
        if string is None:
            return None

        string = string.lower()
        
        if string == 'administrador':
            return Role.ADMIN
        elif string == 'empleado':
            return Role.EMPLOYED

        return None