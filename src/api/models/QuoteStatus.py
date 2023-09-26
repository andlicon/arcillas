from . import Enum

class QuoteStatus(Enum):
    PENDING = {'id': 1, 'name': 'pendiente'}
    DONE = {'id': 2, 'name': 'lista'}

    def get_value(string):
        if string is None:
            return None

        string = string.lower()
        
        if string == QuoteStatus.PENDING.name:
            return QuoteStatus.PENDING
        elif string == QuoteStatus.DONE.name:
            return QuoteStatus.DONE

        return None