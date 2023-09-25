import { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

export const usePerPage = ({ query, page }) => {
    const { store, actions } = useContext(Context);
    const { productPage, perPage } = store;
    const { info } = productPage;

    const perPageHandler = async ({ target }) => {
        const perPageParameter = target.value;
        const regexPage = /page=.{1,4}&/;
        let filter = '/?' + info?.filters?.replace(regexPage, 'page' + '&');
        const regexPerPage = /per_page.{0,4}&/;
        filter = filter.replace(regexPerPage, 'per_page=' + perPageParameter + '&');
        await query(filter);
        actions.setPerPage(parseInt(perPageParameter));
    };

    useEffect(() => {
        actions.setPerPage(info?.per_page);
    }, [info?.per_page]);

    return ({
        perPage,
        perPageHandler
    })
}