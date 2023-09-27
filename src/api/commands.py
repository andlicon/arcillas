import click
import os
from base64 import b64encode
from .models import db
from .models.User import User
from .models.User import User
from .models.Role import Role
from .models.UserStatus import UserStatus
from .utils.passwordUtils import create_password

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    @app.cli.command("insert-admin-user")
    def insert_admin_user():
        email = os.getenv("ADMIN_EMAIL")
        name = os.getenv("ADMIN_NAME")
        role = Role.ADMIN
        status = UserStatus.ACTIVE
        password = os.getenv("ADMIN_PASSWORD")

        admin = User.query.filter_by(email=email).one_or_none()
        if admin is not None:
            return

        # creating user
        salt = b64encode(os.urandom(32)).decode('utf-8')
        password = create_password(password, salt)
        new_user = User(email=email.lower(), name=name, status=status, role=role, password=password, salt=salt)

        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(e.args)