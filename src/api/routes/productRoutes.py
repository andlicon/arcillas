import os
from . import api
from flask import Flask, request, jsonify, url_for, Blueprint
from ..models.Product import Product
from ..models.Category import Category
from ..models.Category import Sub_Category
from ..models.Unit import Unit


@api.route('/products/', methods=['GET'])
def get_all_products():
    product_query = Product.query

    page = product_query.paginate(page=1, per_page=20)
    product_list = list( map(lambda product: product.serialize(), page.items) )

    response ={
        'info': {
            'count': page.total,
            'next': f'{os.getenv("BACKEND_URL")}/products/?page={page.next_num}' if page.has_next else None,
            'prev': f'{os.getenv("BACKEND_URL")}/products/?page={page.prev_num}' if page.has_prev else None
        },
        'results': product_list
    }

    return jsonify(response)