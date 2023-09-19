from flask import Flask, request, jsonify, url_for, Blueprint
from . import api
from ..models import db
from ..models.Quote import Quote, QuoteItem
from ..models.Product import Product
from ..models.User import User


# POST a quote
@api.route('/quote', methods=['POST'])
def post_quote():
    # Validating body
    if not request.is_json:
        return jsonify({'msg': 'Body must have a json item as body'}), 400

    body = request.get_json()
    user_id = body.get("user_id")
    quote_items = body.get("quote_items")
    if None in [user_id, quote_items]:
        return jsonify({'msg': 'Wrong properties'}), 400

    # quote List must be an array list of quotes {product_id, amount}
    if type(quote_items) is not list:
        return jsonify({'msg': 'quote_items must be a list'}), 400

    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify({'msg': 'User not found'}), 404

    new_quote = Quote(user_id=user.id)
    
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


# POST a quote
@api.route('/quote', methods=['GET'])
def get_all_quote():
    quote_list = Quote.query.all()
    serialized = list(map(lambda quote: quote.serialize(), quote_list))

    return jsonify(serialized), 200