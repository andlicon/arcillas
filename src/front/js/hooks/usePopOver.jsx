import { useEffect } from 'react';
import { activatePopOvers } from '../utils/domUtils.js'

const usePopOver = () => {
  useEffect(() => {
    activatePopOvers()
  }, []);
}
export default usePopOver;