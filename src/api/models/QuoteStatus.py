from . import Enum

class QuoteStatus(Enum):
    PENDING = 'pendiente'
    DONE = 'lista'

    def get_value(string):
        if string is None:
            return None

        string = string.lower()
        
        if string == 'pendiente':
            return QuoteStatus.PENDING
        elif string == 'lista':
            return QuoteStatus.DONE

        return None