import os
from flask import request, jsonify
from ..models.Category import Category

def get_hierarchy(category, prevlist):
    prevlist.append(category.serialize())
    categorys = Category.query.filter_by(category_parent=category.id).all()
    for category_child in categorys:
        get_hierarchy(category_child, prevlist=prevlist)

    return prevlist

def get_hierarchy_parents(category, prevlist):
    prevlist.append(category.serialize())
    id_parent = category.category_parent

    if id_parent is not None:
        get_hierarchy_parents(category.parent, prevlist=prevlist)

    return prevlist.reverse()


def generate_pagination(query, per_page, page_number, **kwargs):
    page = None

    try:
        page = query.paginate(page=page_number, per_page=per_page)
    except:
        page = query.paginate(page=1, per_page=per_page)

    item_list = list( map(lambda item: item.serialize(), page.items) )

    # getting the filters for next queries
    filters = f'per_page={per_page}'
    for key, value in kwargs.items():
        filters += f'&{key}={value}' if value is not None else f'&{key}'

    response ={
        'info': {
            'count': page.total,
            'current_page': page.page,
            'per_page': page.per_page,
            'filters': f'page={page.page}&{filters}',
            'next': f'{os.getenv("BACKEND_URL")}/products/?page={page.next_num}&{filters}' if page.has_next else None,
            'prev': f'{os.getenv("BACKEND_URL")}/products/?page={page.prev_num}&{filters}' if page.has_prev else None
        },
        'results': item_list
    }

    return response


def get_category_list(category):
    category_list = []

    if category is not None and category.strip() != '':
        for id in category.split(','):
            if id is None or id == '':
                continue
            try:
                category_list.append(int(id.strip()))
            except Exception as e:
                return jsonify({'msg': 'Se ha proporcionado una categoria inválida'}), 400
    else:
        all_categories = Category.query.all()
        category_list = list(map(lambda item: item.id , all_categories))

    return category_list