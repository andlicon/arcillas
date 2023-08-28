import { useState } from 'react';

const useFilter = (initialValue, queryFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(initialValue);

  const setFilterHandler = (name, value) => {
    setFilter({
      ...filter,
      [name]: value
    })
  }

  const getResult = async (filterParameter = filter) => {
    setIsLoading(true);
    let filterString = '/?';

    for (const attribute in filterParameter) {
      const value = filterParameter[attribute];

      filterString += attribute;

      if (typeof value == 'object') {
        let categoriesString = '=';
        value.forEach((id) => categoriesString += id + ',');

        filterString += categoriesString;
      }
      else if (value != 'all' && value != '') filterString += `=${value}`;

      filterString += '&';
    }

    console.log(filterString)
    await queryFunction(filterString);
    setIsLoading(false);
  }

  return ({
    filter,
    isLoading,
    setFilterHandler,
    getResult
  });
};
export default useFilter;