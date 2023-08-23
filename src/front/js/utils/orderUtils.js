export const orderCategorys = (categorys) => {
  const categorysSorted = categorys.sort((x, y) => {
    return x.hierarchy_name.localeCompare(y.hierarchy_name)
  });
  return categorysSorted.sort();
}