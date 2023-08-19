import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import and_
import cloudinary.uploader as uploader
from . import api
from ..models import db
from ..models.Product import Product
from ..models.Category import Category
from ..models.Category import Sub_Category
from ..models.Unit import Unit
from ..models.User import User
from ..models.Role import Role


@api.route('/products/', methods=['GET'])
def get_all_products():
    args = request.args
    page_args = args.get('page', default=1, type=int)
    name_args = args.get('name', default='%', type=str)
    category_args = args.get('category', default=None, type=int)
    sub_category_args = args.get('sub_category', default=None, type=int)

    product_query = Product.query.filter(
        and_(
            Product.name.ilike(f'%{name_args}%'),
            Product.category_id == category_args if category_args is not None else Product.category_id != None,
            Product.sub_category_id == sub_category_args if sub_category_args is not None else Product.sub_category_id != None
            ))

    page = product_query.paginate(page=page_args, per_page=20)
    product_list = list( map(lambda product: product.serialize(), page.items) )

    name_parameter = f'name={name_args}'
    category_parameter = f'category={category_args}' if category_args != None else 'category'
    sub_category_parameter = f'sub_category={sub_category_args}' if sub_category_args != None else 'sub_category'

    response ={
        'info': {
            'count': page.total,
            'next': f'{os.getenv("BACKEND_URL")}/products/?page={page.next_num}&{name_parameter}&{category_parameter}&{sub_category_parameter}' if page.has_next else None,
            'prev': f'{os.getenv("BACKEND_URL")}/products/?page={page.prev_num}&{name_parameter}&{category_parameter}&{sub_category_parameter}' if page.has_prev else None
        },
        'results': product_list
    }

    return jsonify(response), 200


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
    sub_category_id = form.get('sub_category_id', None)
    unit_id = form.get('unit_id', None)
    image = request.files.get('image', None)

    if None in [name, description, usage, category_id, sub_category_id, unit_id, image]:
        return jsonify({'message': 'El form tiene propiedades inválidas'}), 400

    # comprobar que los ids sean validos
    category = Category.query.filter_by(id=category_id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 400
    
    sub_category = Sub_Category.query.filter_by(id=sub_category_id).one_or_none()
    if sub_category is None:
        return jsonify({'message': 'La sub categoria no existe'}), 400

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
        sub_category_id=sub_category_id, 
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

    return jsonify({}), 204


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
    sub_category_id = form.get('sub_category_id', None)
    unit_id = form.get('unit_id', None)
    image = request.files.get('image', None)

    if None in [name, description, usage, category_id, sub_category_id, unit_id, image]:
        return jsonify({'message': 'El form tiene propiedades inválidas'}), 400

    # comprobar que los ids sean validos
    category = Category.query.filter_by(id=category_id).one_or_none()
    if category is None:
        return jsonify({'message': 'La categoria no existe'}), 400
    
    sub_category = Sub_Category.query.filter_by(id=sub_category_id).one_or_none()
    if sub_category is None:
        return jsonify({'message': 'La sub categoria no existe'}), 400

    unit = Unit.query.filter_by(id=unit_id).one_or_none()
    if unit is None:
        return jsonify({'message': 'La unidad no existe'}), 400

    response_image = uploader.upload(image)
    image_url = response_image.get('url')

    product.name = name
    product.description = description
    product.usage = usage
    product.category_id = category_id
    product.sub_category_id = sub_category_id
    product.unit_id = unit_id
    product.image_url = image_url
    
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error.args)
        return jsonify({'message': error.args}), 500

    return jsonify(product.serialize()), 200