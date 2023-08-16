from flask_sqlalchemy import SQLAlchemy
from abc import ABC, abstractmethod
import enum
import abc

db = SQLAlchemy()


class Enum(enum.Enum):
    @abc.abstractclassmethod
    def get_value(self, string):
        """
        recive a string that represent an Enum value.
            ChildEnum.Value - if the string match with any value
            None - if the string dosn't match with any value
        """
        pass