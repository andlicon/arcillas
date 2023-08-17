from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from . import api
from ..utils.passwordUtils import check_password
from ..models.User import User

@api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'message': 'Body is not a valid JSON'}), 400

    body = request.get_json()
    email = body.get('email')
    password = body.get('password')
    if None in [email, password]:
        return jsonify({'message': 'Wrong properties'}), 400

    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({'message': 'bad credentials'}), 400

    if not check_password(user.password, f'{password}{user.salt}'):
        return jsonify({'message': 'bad credentials'}), 400

    token = create_access_token(identity=user.id)

    return jsonify({'token': token, 'user': user.serialize()}), 200