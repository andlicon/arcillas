import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const QuoteList = () => {
  const { store } = useContext(Context);
  const { quoteList } = store;

  return (
    <>
      <button className="btn offcanvas__opener" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
        <i className="bi bi-cart4"></i>
      </button>

      <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Lista de productos a cotizar1
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {
            quoteList.map((quote) => {
              const product = quote.product;
              const amount = quote.amount;
              return (
                <div key={product.id}>
                  {product.name} x {amount}
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
export default QuoteList;