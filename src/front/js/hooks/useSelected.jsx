import { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { toast } from 'react-toastify';

const useSelected = (removeFunction) => {
  const { actions } = useContext(Context);
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
    let promisesList = [];
    if (selected.length == 0) toast.error("No se han elegido elementos");
    else {
      selected.forEach(async (id) => {
        promisesList.push(removeFunction(id));
      });
      setSelected([]);
    }

    return Promise.all(promisesList)
  };

  return ({
    selected,
    selectHandler,
    removeItems
  });
};
export default useSelected;