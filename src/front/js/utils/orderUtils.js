export const orderCategorys = (categorys) => {
  const categorysSorted = categorys.sort((x, y) => {
    return x.hierarchy_name.localeCompare(y.hierarchy_name)
  });
  return categorysSorted.sort();
}

export const orderCategoriesByParent = (categories) => {
  return categories.sort((a, b) => a.category_parent - b.category_parent);
}