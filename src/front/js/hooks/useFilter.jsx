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

  const getResult = async () => {
    setIsLoading(true);
    let filterString = '/?';

    for (const attribute in filter) {
      const value = filter[attribute];

      if (value == 'all' || value == '') filterString += attribute;
      else filterString += `${attribute}=${value}`;

      filterString += '&';
    }

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