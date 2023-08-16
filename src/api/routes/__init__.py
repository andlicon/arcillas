from flask import Flask, request, jsonify, url_for, Blueprint
from ..models import db

api = Blueprint('api', __name__)

from . import userRoutes
from . import loginRoutes