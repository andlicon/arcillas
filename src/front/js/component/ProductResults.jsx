import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/productResults.css';

const ProductResults = () => {
  const { store } = useContext(Context);
  const { productPage, categorys, units } = store;
  const { results } = productPage;

  return (
    <table className='results container'>
      <thead>
        <tr>
          <td>Select</td>
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

            return (
              <tr className='results__tr' key={product.id}>
                <td>
                  a
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