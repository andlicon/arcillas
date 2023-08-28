import { useState } from 'react';

const useSelected = () => {
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

  return ({
    selected,
    selectHandler
  });
};
export default useSelected;