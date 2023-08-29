import { useState } from 'react';

const useSelected = (removeFunction) => {
  const [selected, setSelected] = useState([]);

  const selectHandler = (toSelect) => {
    if (typeof toSelect == 'object') {
      setSelected(toSelect);
    }
    else if (selected.some(id => id == toSelect)) {
      setSelected(selected.filter(id => id != toSelect));
    }
    else {
      setSelected([...selected, toSelect]);
    }
  };

  const removeItems = () => {
    selected.forEach((id) => removeFunction(id));
  }

  return ({
    selected,
    selectHandler,
    removeItems
  });
};
export default useSelected;