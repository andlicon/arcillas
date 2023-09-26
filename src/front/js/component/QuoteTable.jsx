import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";

const QuoteTable = ({
  quoteList,
  isAdmin,
  selected,
  selectHandler,
  amountList }) => {

  const { store } = useContext(Context);
  const [all, setAll] = useState(false);

  const onChangeAllHandler = (event) => {
    onChangerHandler(event);
    setAll(!all);
  }

  const onChangerHandler = ({ target }) => {
    const value = target.value;

    if (value == 'all' && !all) {
      const checkboxList = document.getElementsByClassName('select');
      const idList = [];
      for (const checkbox of checkboxList) {
        if (checkbox.value == 'all') continue
        idList.push(parseInt(checkbox.value));
      }
      selectHandler(idList)
    }
    else if (value == 'all' && all) {
      selectHandler([])
    }
    else {
      selectHandler(parseInt(value));
    }
  };

  return (
    <div className='table-responsive box-shadow results-container'>
      <table className='table results table-secondary' >
        <thead>
          <tr>
            <td> <input className="form-check-input" type="checkbox" id="select-all" value='all' aria-label="" onChange={onChangeAllHandler} /> </td>
            <td>Email</td>
            <td>Estatus</td>
            <td>Fecha</td>
            <td>Cantidad de productos</td>
            {isAdmin
              ? <td></td>
              : <td>Cantidad</td>}
          </tr>
        </thead>
        <tbody>
          {
            quoteList && quoteList?.map((quote, index) => {
              const date = quote?.created_at.match(/[0-9]+\s[A-Za-z]+\s[0-9]+/);
              const isChecked = selected.includes(quote?.id);

              return (
                <tr className={'results__tr'} key={quote?.id}>
                  <td>
                    <input className="form-check-input select" type="checkbox" id={"select-" + quote?.id} value={quote?.id} onChange={onChangerHandler} checked={isChecked} aria-label="" />
                  </td>
                  <td>
                    {quote?.email}
                  </td>
                  <td>
                    {quote?.status[0].toUpperCase() + quote?.status.substring(1)}
                  </td>
                  <td>
                    {date}
                  </td>
                  <td>
                    {
                      quote?.quote_items?.length
                    }
                  </td>
                  {
                    isAdmin
                      ? <td>
                        <Link className="btn btn-primary" to={`/admin/quote/${quote?.id}/edit`}>
                          <i className="bi bi-pencil-fill"></i>
                          Editar
                        </Link>
                      </td>
                      : <td>
                        {amountList[index]}
                      </td>
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
export default QuoteTable;