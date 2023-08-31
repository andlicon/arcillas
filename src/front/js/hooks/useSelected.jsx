import { useState } from 'react';
import { toast } from 'react-toastify';

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

  const removeItems = async () => {
    if (selected.length == 0) toast.error("No se han elegido elementos");
    else {
      selected.forEach(async (id) => {
        await removeFunction(id);
      });
      setSelected([]);
    }
  };

  return ({
    selected,
    selectHandler,
    removeItems
  });
};
export default useSelected;