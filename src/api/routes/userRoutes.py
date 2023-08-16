from flask import Flask, request, jsonify, url_for, Blueprint
from . import api
from ..models import db
from ..models.User import User
from ..models.UserStatus import UserStatus
from ..models.Role import Role
from ..new_utils import duplicated

@api.route('/user', methods=['POST'])
def register_user():
    # Validating body
    if not request.is_json:
        return jsonify({'message': 'Body must have a json item as body'}), 400

    body = request.get_json()
    email = body.get("email")
    name = body.get("name")
    role = body.get("role")
    status = body.get("status")
    password = body.get("password")
    if None in [email, name, status, role, password]:
        return jsonify({'message': 'Wrong properties'}), 400

    # validating Enums
    role = Role.get_value(role)
    if role is None:
        return jsonify({'message': 'Invalid Role specified'}), 400

    status = UserStatus.get_value(status)
    if role is None:
        return jsonify({'message': 'Invalid Status specified'}), 400

    # is any column duplicated ?
    duplicated_validation = duplicated.validate_new_user(email)
    is_duplicated = duplicated_validation[0]
    if not is_duplicated:
        message = duplicated_validation[1]
        print(message)
        return jsonify({'message': message}), 409

    new_user = User(email=email, name=name, status=status, role=role, password=password, salt=1)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(e.args)
        return jsonify({'message': 'Internal error'}), 500
    
    return jsonify(body), 201


@api.route('/user', methods=['GET'])
def get_user():
    return jsonify({'message': 'okidoc'}), 200