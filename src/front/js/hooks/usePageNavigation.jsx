import { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

export const usePageNavigation = () => {
  const { store, actions } = useContext(Context);
  const { productPage } = store;
  const { info } = productPage;
  const [currentPage, setCurrentPage] = useState(10);

  const prev = info?.prev;
  const next = info?.next;
  const resultsCount = info?.count;

  const nextPageHandler = async ({ target }) => {
    const name = target.name;
    let filter = null;

    if (name == 'next' && next != null) {
      filter = info.next.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(parseInt(currentPage) + 1);
    }
    else if (name == 'prev' && prev != null) {
      filter = prev.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(parseInt(currentPage) - 1);
    }
    else if (name == 'numberNext' && target.value != currentPage) {
      const pageNumber = target.value;
      const regex = /page=.{1,4}&/;
      filter = '/?' + info?.filters.replace(regex, 'page=' + pageNumber + '&');
      setCurrentPage(pageNumber);
    }

    if (filter != null) {
      await actions.getProductPage(filter);
    }
  };

  useEffect(() => {
    setCurrentPage(info?.current_page);
  }, [info?.current_page]);


  return ({
    currentPage,
    prev,
    next,
    resultsCount,
    nextPageHandler
  })
}