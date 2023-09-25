import { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

export const usePageNavigation = ({ page }) => {
  const { store, actions } = useContext(Context);
  const { currentPage } = store;

  const prev = page?.info?.prev;
  const next = page?.info?.next;
  const resultsCount = page?.info?.count;

  const nextPageHandler = async ({ target }) => {
    const name = target.name;
    let filter = null;

    if (name == 'next' && next != null) {
      filter = page?.info?.next.replace(process.env.BACKEND_URL + '/products', '');
      actions.setCurrentPage(parseInt(currentPage) + 1);
    }
    else if (name == 'prev' && prev != null) {
      filter = prev.replace(process.env.BACKEND_URL + '/products', '');
      actions.setCurrentPage(parseInt(currentPage) - 1);
    }
    else if (name == 'numberNext' && target.value != currentPage) {
      const pageNumber = target.value;
      const regex = /page=.{1,4}&/;
      filter = '/?' + page?.info?.filters.replace(regex, 'page=' + pageNumber + '&');
      actions.setCurrentPage(pageNumber);
    }

    if (filter != null) {
      await actions.getProductPage(filter);
    }
  };

  useEffect(() => {
    actions.setCurrentPage(page?.info?.current_page);
  }, [page?.info?.current_page]);


  return ({
    currentPage,
    prev,
    next,
    resultsCount,
    nextPageHandler
  })
}