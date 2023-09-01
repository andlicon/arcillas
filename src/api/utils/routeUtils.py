from ..models.Category import Category

def get_hierarchy(category, prevlist):
    prevlist.append(category.serialize())
    categorys = Category.query.filter_by(category_parent=category.id).all()
    for category_child in categorys:
        get_hierarchy(category_child, prevlist=prevlist)

    return prevlist

def get_hierarchy_parents(category, prevlist):
    prevlist.append(category.serialize())
    id_parent = category.category_parent

    if id_parent is not None:
        get_hierarchy_parents(category.parent, prevlist=prevlist)

    return prevlist