import React from 'react';

const ProductResults = ({
  product_list
}) => {
  return (
    <table className='pagination__results'>
      <thead>
        <tr>
          <td>Select</td>
          <td>Imagen</td>
          <td>Nombre</td>
          <td>Descripción</td>
          <td>Categoría</td>
          <td>Uso</td>
          <td>Unidad</td>
        </tr>
      </thead>
      <tbody>
        {
          product_list && product_list.map((product) => {
            console.log(product)

            return (
              <tr className='pagination__results-results' key={product.id}>
                <td>a</td>
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
                  {product.category_id}
                </td>
                <td>
                  {product.usage}
                </td>
                <td>
                  {product.unit_id}
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