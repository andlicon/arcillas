import { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

export const usePerPage = ({ initial }) => {
    const { store, actions } = useContext(Context);
    const { productPage } = store;
    const { info } = productPage;
    const [perPage, setPerPage] = useState(initial);

    const perPageHandler = async ({ target }) => {
        const perPageParameter = target.value;
        const regexPage = /page=.{1,4}&/;
        let filter = '/?' + info.filters.replace(regexPage, 'page' + '&');
        const regexPerPage = /per_page.{0,4}&/;
        filter = filter.replace(regexPerPage, 'per_page=' + perPageParameter + '&');
        await actions.getProductPage(filter);
        setPerPage(parseInt(perPageParameter));
    };

    useEffect(() => {
        setPerPage(info?.per_page);
    }, [info?.per_page]);

    return ({
        perPage,
        perPageHandler
    })
}