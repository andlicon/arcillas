import os
from flask_admin import Admin
from .models import db
from .models.User import User
from .models.Product import Product
from .models.Category import Category
from .models.Unit import Unit
from .models.Quote import Quote, QuoteItem
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='ArcillasPLC', template_mode='bootstrap3') 

    # adding models
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Unit, db.session))
    admin.add_view(ModelView(Quote, db.session))
    admin.add_view(ModelView(QuoteItem, db.session))