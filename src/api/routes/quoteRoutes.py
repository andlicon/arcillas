from flask import Flask, request, jsonify, url_for, Blueprint
from . import api
from ..models import db
from ..models.Quote import Quote, products
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
    quote_list = body.get("quote_list")
    if None in [user_id, quote_list]:
        return jsonify({'msg': 'Wrong properties'}), 400

    # quote List must be an array list of quotes {product_id, amount}
    if type(quote_list) is not list:
        return jsonify({'msg': 'quote_list must be a list'}), 400

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
    
    for quote_item in quote_list:
        amount = quote_item.get('amount')
        product_id = quote_item.get('product_id')
        
        if None in [amount, product_id]:
            # Borrar todos la quote y todos los products
            return jsonify({'msg': 'Quote product has wrong properties'}), 200

        product_quoted = products.insert().values(
            quote_id = new_quote.id,
            product_id = product_id,
            amount = amount
        )

        try:
            db.session.execute(product_quoted)
            db.session.commit()
        except Exception as e:
            print(e)
            db.session.rollback()
            return jsonify({'msg': 'Some internal error'}), 500

    return jsonify({'msg': 'ok'}), 200


# POST a quote
@api.route('/quote', methods=['GET'])
def get_all_quote():
    quote_list = Quote.query.all()
    serialized = list(map(lambda quote: quote.serialize(), quote_list))

    return jsonify(serialized), 200