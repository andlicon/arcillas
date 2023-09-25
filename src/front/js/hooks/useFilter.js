import { useState } from 'react';

const useFilter = (initial) => {
  const [filter, setFilter] = useState(initial);

  const setFilterHandler = ({ target }) => {
    const name = target.name;
    const value = target.value;

    setFilter({
      ...filter,
      [name]: value
    })
  }

  const getString = (filterParameter = filter) => {
    let filterString = '/?';

    for (const attribute in filterParameter) {

      const value = filterParameter[attribute];

      filterString += attribute;

      if (value != 'all' && value != '') filterString += `=${value}`;

      filterString += '&';
    }

    return filterString;
  }

  return ({
    filter,
    getString,
    setFilterHandler
  });
};
export default useFilter;