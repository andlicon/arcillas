from flask import Flask, request, jsonify, url_for, Blueprint
from . import api
from ..models import db
from ..models.User import User
from ..models.UserStatus import UserStatus
from ..models.Role import Role
from ..new_utils import duplicated

@api.route('/user', methods=['POST'])
def register_user():
    if not request.is_json:
        return jsonify({'message': 'Body must have a json item as body'}), 400

    body = request.get_json()
    email = body.get("email")
    name = body.get("name")
    status = body.get("status")
    role = body.get("role")
    password = body.get("password")
    if None in [email, name, status, role, password]:
        return jsonify({'message': 'Wrong properties'}), 400

    # Validating data.

    # Creating new user.
    new_user = User(email=email, name=name, status=UserStatus.ACTIVE, role=Role.ADMIN, password=password, salt=1)
    duplicated_validation = duplicated.validate_new_user(new_user)
    is_duplicated = duplicated_validation[0]
    if not is_duplicated:
        message = duplicated_validation[1]
        return jsonify({'message': message}), 400

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