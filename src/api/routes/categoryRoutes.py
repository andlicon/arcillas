from flask import jsonify
from . import api
from ..models import db
from ..models.Category import Category


@api.route('/categorys', methods=['GET'])
def get_all_categorys():
    query = Category.query.all()
    category_list = list(map(lambda item: item.serialize(), query))
    return jsonify(category_list), 200


@api.route('/categorys/<int:id>', methods=['GET'])
def get_one_category(id):
    category = Category.query.filter_by(id=id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 404
    
    return jsonify(category.serialize()), 200


