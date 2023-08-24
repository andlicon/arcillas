import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/productResults.css';

const ProductResults = ({ selectHandler, selected }) => {
  const [all, setAll] = useState(false);
  const { store } = useContext(Context);
  const { productPage, categorys, units } = store;
  const { results } = productPage;

  const onChangeAllHandler = (event) => {
    onChangerHandler(event);
    setAll(!all);
  }

  const onChangerHandler = ({ target }) => {
    const value = target.value;

    if (value == 'all' && !all) {
      const checkboxList = document.getElementsByClassName('form-check-input');
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
    <table className='results container'>
      <thead>
        <tr>
          <td> <input className="form-check-input" type="checkbox" id="select-all" value='all' aria-label="" onChange={onChangeAllHandler} /> </td>
          <td>Imagen</td>
          <td>Nombre</td>
          <td>Descripción</td>
          <td>Categoría</td>
          <td>Uso</td>
          <td>Unidad</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {
          results && results.map((product) => {
            const category = categorys.filter((element) => element.id == product.category_id);
            const unit = units.filter((element) => element.id == product.unit_id);
            const isChecked = selected.includes(product.id);

            return (
              <tr className='results__tr' key={product.id}>
                <td>
                  <input className="form-check-input" type="checkbox" id={"select-" + product.id} value={product.id} onChange={onChangerHandler} checked={isChecked} aria-label="" />
                </td>
                <td>
                  <img src={product.image_url} alt={"imagen de " + product.name} />
                </td>
                <td>
                  {product.name}
                </td>
                <td>
                  {product.description}
                </td>
                <td>
                  {category[0].name}
                </td>
                <td>
                  {product.usage}
                </td>
                <td>
                  {unit[0].name}
                </td>
                <td>
                  edit
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
};
export default ProductResults;