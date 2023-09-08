import { useState } from 'react';
import {
  INPUT_TYPE_SWITCH,
  INPUT_TYPE_FILE
} from '../constant/inputConstant.js';

export const useField = ({ type }) => {
  const [value, setValue] = useState('');

  const onChange = event => {
    if (type == INPUT_TYPE_SWITCH) {
      setValue(event.target.checked);
    }
    else if (type == INPUT_TYPE_FILE) {
      setValue(event.target.files[0]);
    }
    else {
      setValue(event.target.value);
    }
  };

  return ({
    value,
    type,
    onChange
  })
};