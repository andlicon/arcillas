from flask import jsonify
from . import api
from ..models import db
from ..models.Unit import Unit

@api.route('/units', methods=['GET'])
def get_all_units():
    all_units = Unit.query.all()
    unit_list = list(map(lambda unit: unit.serialize(), all_units))

    return jsonify(unit_list), 200