from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import api
from ..utils.routeUtils import get_hierarchy, get_hierarchy_parents
from ..models import db
from ..models.Category import Category
from ..models.User import User
from ..models.Role import Role
from ..utils.duplicatedUtils import validate_new_category


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


@api.route('/categorys', methods=['POST'])
@jwt_required()
def post_category():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no existe'}), 404
    if user.role is not Role.ADMIN:
        return jsonify({'message': 'El usuario no tiene permisos suficiente'}), 401
    
    if not request.is_json:
        return jsonify({'message': 'El body debe ser un JSON valido'}), 400

    body = request.get_json()
    name = body.get('name', None)
    category_parent = body.get('category_parent', None)

    if None in [name]:
        return jsonify({'message': 'El body no tiene los atributos necesarios'}), 400

    duplicated_validation = validate_new_category(name.capitalize())
    is_valid = duplicated_validation[0]
    if not is_valid:
        message = duplicated_validation[1]
        return jsonify({'message': message}), 400

    if category_parent is not None:
        aux = Category.query.filter_by(id=category_parent).one_or_none()
        if aux is None:
            return jsonify({'message': 'La categoria padre no existe'}), 404

    category = Category(name=name.capitalize(), category_parent=category_parent)
    
    try:
        db.session.add(category)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e.args)
        return jsonify({'message': 'Ocurrio un error inesperado'}), 500

    return jsonify(category.serialize()), 200


@api.route('/categorys/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no existe'}), 404
    if user.role is not Role.ADMIN:
        return jsonify({'message': 'Usuario no tiene permiso'}), 401
    
    if not request.is_json:
        return jsonify({'message': 'El body debe ser un JSON valido'}), 400

    category = Category.query.filter_by(id=id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 404

    body = request.get_json()
    name = body.get('name', None)
    category_parent = body.get('category_parent', None)

    if None in [name]:
        return jsonify({'message': 'El body no tiene los atributos necesarios'}), 400

    duplicated_validation = validate_new_category(name.capitalize())
    is_valid = duplicated_validation[0]
    if not is_valid:
        message = duplicated_validation[1]
        return jsonify({'message': message}), 400

    if category_parent is not None:
        aux = Category.query.filter_by(id=category_parent).one_or_none()
        if aux is None:
            return jsonify({'message': 'La categoria padre no existe'}), 404

    category.name = name.capitalize()
    category.category_parent=category_parent

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e.args)
        return jsonify({'message': 'Ocurrio un error interno'}), 500

    return jsonify(category.serialize()), 200


@api.route('/categorys/<int:id>', methods=['PATCH'])
@jwt_required()
def patch_category(id):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no existe'}), 404
    if user.role is not Role.ADMIN:
        return jsonify({'message': 'Usuario no tiene permiso'}), 401
    
    if not request.is_json:
        return jsonify({'message': 'El body debe ser un JSON valido'}), 400

    category = Category.query.filter_by(id=id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 404

    body = request.get_json()
    name = body.get('name', None)
    category_parent = body.get('category_parent', None)

    if name is not None:
        duplicated_validation = validate_new_category(name.capitalize())
        is_valid = duplicated_validation[0]
        if not is_valid:
            message = duplicated_validation[1]
            return jsonify({'message': message}), 400
        else:
            category.name = name.capitalize()

    if category_parent is not None:
        aux = Category.query.filter_by(id=category_parent).one_or_none()
        if aux is None:
            return jsonify({'message': 'La categoria padre no existe'}), 404
        else:
            category.category_parent=category_parent

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e.args)
        return jsonify({'message': 'Ocurrio un error interno'}), 500

    return jsonify(category.serialize()), 200


@api.route('/categorys/<int:id>/hierarchy', methods=['GET'])
def get_category_hierarchy(id):
    category = Category.query.filter_by(id=id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 404

    category_list = []
    get_hierarchy(category, category_list)

    return jsonify(category_list), 200


@api.route('/categorys/<int:id>/hierarchy-parents', methods=['GET'])
def get_categories_parents(id):
    category = Category.query.filter_by(id=id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 404

    category_list = []
    get_hierarchy_parents(category, category_list)
    return jsonify(category_list), 200