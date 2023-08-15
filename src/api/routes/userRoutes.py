from flask import Flask, request, jsonify, url_for, Blueprint
from . import api

@api.route('/user', methods=['POST'])
def register_user():
    return jsonify({'message': 'ok'}), 200


@api.route('/user', methods=['GET'])
def get_user():
    return jsonify({'message': 'okidoc'}), 200