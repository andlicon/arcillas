import { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

const usePagination = () => {
  const { store, actions } = useContext(Context);
  const { productPage } = store;
  const { info } = productPage;
  const { getProductPage } = actions;
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(10);

  const nextPageHandler = async ({ target }) => {
    const name = target.name;
    let filter = null;

    setIsLoading(true);

    if (name == 'next' && info.next != null) {
      filter = info.next.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(parseInt(currentPage) + 1);
    }
    else if (name == 'prev' && info.prev != null) {
      filter = info.prev.replace(process.env.BACKEND_URL + '/products', '');
      setCurrentPage(parseInt(currentPage) - 1);
    }
    else if (name == 'numberNext' && target.value != currentPage) {
      const pageNumber = target.value;
      const regex = /page=.{1,4}&/;
      filter = '/?' + info.filters.replace(regex, 'page=' + pageNumber + '&');
      setCurrentPage(pageNumber);
    }

    if (filter != null) {
      await getProductPage(filter);
    }

    setIsLoading(false);
  };

  const perPageHandler = async ({ target }) => {
    setIsLoading(true);

    const perPageParameter = target.value;
    const regexPage = /page=.{1,4}&/;
    let filter = '/?' + info.filters.replace(regexPage, 'page' + '&');
    const regexPerPage = /per_page.{0,4}&/;
    filter = filter.replace(regexPerPage, 'per_page=' + perPageParameter + '&');
    await getProductPage(filter);
    setPerPage(parseInt(perPageParameter));
    setCurrentPage(1);
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(info?.current_page);
    setPerPage(info?.per_page);
  }, [info]);

  return ({
    perPage,
    currentPage,
    isLoading,
    nextPageHandler,
    perPageHandler
  });
};

export default usePagination;