import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';

const useFilter = (initial) => {
  const [filter, setFilter] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const { actions, store } = useContext(Context);
  const { setStoreFilter, getCategoryHierarchy } = actions;

  const setFilterHandler = (name, value) => {
    setFilter({
      ...filter,
      [name]: value
    })
  }

  const getString = (filterParameter = filter) => {
    let filterString = `/?page=${store.currentPage}&per_page=${store.perPage}&`;

    for (const attribute in filterParameter) {
      if (attribute == 'hierarchy') continue;

      const value = filterParameter[attribute];

      filterString += attribute;

      if (attribute == 'category' && filter['subCategory']) {
        let categoriesString = '=';
        filter['hierarchy'].forEach((id) => categoriesString += id + ',');

        filterString += categoriesString;
      }
      else if (value != 'all' && value != '') filterString += `=${value}`;

      filterString += '&';
    }

    return filterString;
  }

  const saveFilter = () => {
    setStoreFilter(getString());
  }

  useEffect(() => {
    const looForHerarchy = async () => {
      setIsLoading(true);
      const category_response = await getCategoryHierarchy(filter['category']);
      const categoryList = [];
      category_response.forEach((category) => categoryList.push(category.id) + ',');
      setFilterHandler('hierarchy', categoryList);
      setIsLoading(false);
    };
    if (filter['category'] != 'all') looForHerarchy();

  }, [filter['category'], filter['subCategory']]);

  return ({
    filter,
    isLoading,
    getString,
    setFilterHandler,
    saveFilter
  });
};
export default useFilter;