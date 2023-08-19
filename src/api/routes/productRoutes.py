import os
from . import api
from flask import Flask, request, jsonify, url_for, Blueprint
from ..models.Product import Product
from ..models.Category import Category
from ..models.Category import Sub_Category
from ..models.Unit import Unit
from sqlalchemy import and_


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

    page = product_query.paginate(page=page_args, per_page=1)
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

    return jsonify(response)