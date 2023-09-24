import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import and_
import cloudinary.uploader as uploader
from . import api
from ..models import db
from ..models.Product import Product
from ..models.Category import Category
from ..models.Unit import Unit
from ..models.User import User
from ..models.Role import Role
from ..utils.routeUtils import generate_pagination, get_category_list


@api.route('/products/', methods=['GET'])
def get_all_products():
    args = request.args
    # info
    page_args = args.get('page', default=1, type=int)
    per_page_args = args.get('per_page', default=10, type=int)
    # product
    name_args = args.get('name', default='%', type=str)
    description_args = args.get('description', default='%', type=str)
    usage_args = args.get('usage', default='%', type=str)
    category_args = args.get('category', default=None, type=str)
    unit_args = args.get('unit', default=None, type=int)

    category_list = get_category_list(category_args)

    product_query = Product.query.filter(
            and_(
                Product.name.ilike(f'%{name_args}%'),
                Product.description.ilike(f'%{description_args}%'),
                Product.usage.ilike(f'%{usage_args}%'),
                Product.category_id.in_(category_list),
                Product.unit_id == unit_args if unit_args is not None else Product.unit_id != None
                )).order_by(Product.name)

    if category_args is None or category_args.strip() == '':
        category_args = None
    
    attributes = {
        'name': name_args,
        'category': category_args,
        'description': description_args,
        'usage': usage_args,
        'unit' : unit_args
    }

    pagination = generate_pagination(product_query, per_page_args, page_args, **attributes)

    return jsonify(pagination), 200


@api.route('/products/<int:id>', methods=['GET'])
def get_one_product(id):
    product = Product.query.filter_by(id=id).one_or_none()

    if product is None:
        return jsonify({'message': 'Producto no encontrado'}), 404

    return jsonify(product.serialize()), 200


@api.route('/products', methods=['POST'])
@jwt_required()
def post_product():
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    if user.role != Role.ADMIN:
        return jsonify({'message': 'No tienes permisos suficientes'}), 401

    form = request.form
    name = form.get('name', None)
    description = form.get('description', None)
    usage = form.get('usage', None)
    category_id = form.get('category_id', None)
    unit_id = form.get('unit_id', None)
    image = request.files.get('image', None)

    if None in [name, description, usage, category_id, unit_id, image]:
        return jsonify({'message': 'El form tiene propiedades inválidas'}), 400

    # comprobar que los ids sean validos
    category = Category.query.filter_by(id=category_id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 400
    

    unit = Unit.query.filter_by(id=unit_id).one_or_none()
    if unit is None:
        return jsonify({'message': 'La unidad no existe'}), 400

    response_image = uploader.upload(image)
    image_url = response_image.get('url')

    product = Product(
        name=name, 
        description=description, 
        usage=usage, 
        category_id=category_id, 
        unit_id=unit_id,
        image_url=image_url)
    
    try:
        db.session.add(product)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify(product.serialize()), 200


@api.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    if user.role != Role.ADMIN:
        return jsonify({'message': 'No tienes permisos suficientes'}), 401

    product = Product.query.filter_by(id=id).one_or_none()
    if product is None:
        return jsonify({'message': 'El producto no existe'}), 404

    try:
        db.session.delete(product)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message', 'Ocurrio algun error interno'}), 500

    return jsonify({'msg': 'ok'}), 200


@api.route('/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    if user.role != Role.ADMIN:
        return jsonify({'message': 'No tienes permisos suficientes'}), 401

    product = Product.query.filter_by(id=id).one_or_none()
    if product is None:
        return jsonify({'message': 'Producto no encontrado'}), 404

    form = request.form
    name = form.get('name', None)
    description = form.get('description', None)
    usage = form.get('usage', None)
    category_id = form.get('category_id', None)
    unit_id = form.get('unit_id', None)
    image = request.files.get('image', None)

    if None in [name, description, usage, category_id, unit_id, image]:
        return jsonify({'message': 'El form tiene propiedades inválidas'}), 400

    # comprobar que los ids sean validos
    category = Category.query.filter_by(id=category_id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 400

    unit = Unit.query.filter_by(id=unit_id).one_or_none()
    if unit is None:
        return jsonify({'message': 'La unidad no existe'}), 400

    response_image = uploader.upload(image)
    image_url = response_image.get('url')

    product.name = name
    product.description = description
    product.usage = usage
    product.category_id = category_id
    product.unit_id = unit_id
    product.image_url = image_url

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify(product.serialize()), 200


@api.route('/products/<int:id>', methods=['PATCH'])
@jwt_required()
def patch_product(id):
    user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    if user is None:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    if user.role != Role.ADMIN:
        return jsonify({'message': 'No tienes permisos suficientes'}), 401

    product = Product.query.filter_by(id=id).one_or_none()
    if product is None:
        return jsonify({'message': 'Producto no encontrado'}), 404

    form = request.form

    name = form.get('name', None)
    if name is not None:
        product.name = name

    description = form.get('description', None)
    if description is not None:
        product.description = description

    usage = form.get('usage', None)
    if usage is not None:
        product.usage = usage

    category_id = form.get('category_id', None)
    if category_id is not None:
        category = Category.query.filter_by(id=category_id).one_or_none()
        if category is None:
            return jsonify({'message': 'La categoria no existe'}), 400
        product.category_id = category_id

    unit_id = form.get('unit_id', None)
    if unit_id is not None:
        unit = Unit.query.filter_by(id=unit_id).one_or_none()
        if unit is None:
            return jsonify({'message': 'La unidad no existe'}), 400
        product.unit_id = unit_id

    image = request.files.get('image', None)
    if image is not None:
        response_image = uploader.upload(image)
        image_url = response_image.get('url')
        product.image_url = image_url

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify(product.serialize()), 200