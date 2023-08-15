from flask import Flask, request, jsonify, url_for, Blueprint
from . import api

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
        return jsonify({'message': 'wrong properties'}), 400

    # Validating data.

    # Creating new user.
    
    return jsonify(body), 201


@api.route('/user', methods=['GET'])
def get_user():
    return jsonify({'message': 'okidoc'}), 200