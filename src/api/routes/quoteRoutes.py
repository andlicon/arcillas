from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import func, and_, extract
from . import api
from ..models import db
from ..models.Quote import Quote, quote_items
from ..models.QuoteItem import QuoteItem
from ..models.Product import Product
from ..models.User import User
from ..models.QuoteStatus import QuoteStatus
from ..utils.emailUtils import check_email
from ..utils.routeUtils import generate_pagination


# POST a quote
@api.route('/quote', methods=['POST'])
def post_quote():
    # Validating body
    if not request.is_json:
        return jsonify({'msg': 'Body must have a json item as body'}), 400

    body = request.get_json()
    email = body.get("email")
    quote_items = body.get("quote_items")
    if None in [email, quote_items]:
        return jsonify({'msg': 'Wrong properties'}), 400

    # quote List must be an array list of quotes {product_id, amount}
    if type(quote_items) is not list:
        return jsonify({'msg': 'quote_items must be a list'}), 400

    is_valid_email = check_email(email)

    if not is_valid_email:
        return jsonify({'msg': 'Invalid email'}), 400

    new_quote = Quote(email=email)
    
    try:
        db.session.add(new_quote)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'msg': 'Some internal error ocurred'}), 500
    
    for item in quote_items:
        amount = item.get('amount')
        product_id = item.get('product_id')
        
        if None in [amount, product_id]:
            # Borrar todos la quote y todos los products
            return jsonify({'msg': 'Quote product has wrong properties'}), 200

        new_item = QuoteItem(product_id=product_id, amount=amount)
        new_quote.items.append(new_item)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'msg': 'Some internal error ocurred'}), 500

    return jsonify({'msg': 'ok'}), 200


# GET all quote
@api.route('/quote', methods=['GET'])
def get_all_quote():
    args = request.args
    attributes = {
        'email': args.get('email', default='%', type=int),
        'status': args.get('status', default=None, type=str),
        'item_count': args.get('item_count') if args.get('item_count') not in [None, ''] else 0,
        'month': args.get('month', None) if args.get('month', None) not in [None, ''] else None,
        'year': args.get('year', None) if args.get('year', None) not in [None, ''] else None,
        'item_id': args.get('item_id', default=None, type=int)
    }

    quote_status = QuoteStatus.get_value(attributes.get('status'))

    product_query = None
    if attributes.get('item_id') is not None:
        product_query = Quote.items.any(QuoteItem.product_id == attributes.get('item_id'))
    else:
        product_query = Quote.items.any(QuoteItem.product_id != attributes.get('item_id'))
    
    month_query = None
    if attributes.get('month') is not None:
        month_query = extract('month', Quote.created_at) == attributes.get('month')
    else:
        month_query = extract('month', Quote.created_at) != None

    year_query = None
    if attributes.get('year') is not None:
        year_query = extract('year', Quote.created_at) == attributes.get('year')
    else:
        year_query = extract('year', Quote.created_at) != None

    query = db.session.query(Quote)\
        .filter(
            and_(
                Quote.email.ilike(f'%{attributes.get("email")}%'),
                Quote.status == quote_status if quote_status is not None else Quote.status != None,
                month_query,
                year_query
            )
        ).join(quote_items)\
        .group_by(Quote)\
        .having(func.count(quote_items.c.quote_id) >= attributes.get('item_count'))\
        .order_by(Quote.created_at)

    per_page = int(args.get('per_page')) if args.get('per_page') not in [None, ''] else 10
    page = int(args.get('page')) if args.get('page') not in [None, ''] else 1

    pagination = generate_pagination(query, per_page, page, **attributes)

    return jsonify(pagination), 200


# GET one quote
@api.route('/quote/<int:quote_id>', methods=['GET'])
def get_one_quote(quote_id):
    quote = Quote.query.filter_by(id=quote_id).one_or_none()
    
    if quote is None:
        return jsonify({'msg': 'Quote not found'}), 404

    return jsonify(quote.serialize()), 200


# get one quoteItem
@api.route('/quote/item/<int:item_id>', methods=['GET'])
def get_one_quote_item(item_id):
    item = QuoteItem.query.filter_by(id=item_id).one_or_none()
    
    if item is None:
        return jsonify({'msg': 'Quote Item not found'}), 404

    return jsonify(item.serialize()), 200


# get all quote status
@api.route('/quote/status', methods=['GET'])
def get_all_quote_status():
    status_list = [status.value for status in QuoteStatus]

    return jsonify(status_list), 200