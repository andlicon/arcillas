from . import db

class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    category_parent = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)

    # relationship
    parent = db.relationship("Category", remote_side=[id])


    def __repr__(self):
        return f'<Category {self.id}>'


    def serialize(self):
        return{
            'id': self.id,
            'name': self.name,
            'category_parent': self.category_parent,
            'hierarchy_name' : self.get_hierarchy_name()
        }

    def get_hierarchy_name(self):
        if self.category_parent is None:
            return self.name

        return f'{self.parent.get_hierarchy_name()}>>{self.name}'