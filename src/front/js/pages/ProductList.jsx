import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import '../../styles/productList.css';
import useSelected from '../hooks/useSelected.jsx';
import ItemPagination from '../component/ItemPagination.jsx';
import ProductResults from '../component/ProductResults.jsx';
import Modal from '../component/Modal.jsx';
import Filter from '../component/Filter.jsx';
import FilterProductForm from '../component/FilterProductForm.jsx';

const modalDelete = {
  body: '¿Estás seguro que quieres ejecutar esta función?',
  title: '¿Estás seguro?',
  accept: 'Borrar',
  cancel: 'Cancelar'
}

const ProductList = () => {
  const { actions, store } = useContext(Context);
  const { selected, selectHandler, removeItems } = useSelected(actions.deleteProduct);

  const deleteHandler = async () => {
    await removeItems();
    await actions.getProductPage();
  };

  console.log(store.perPage, store.currentPage)

  return (
    <div className='container'>
      <div className='productList__header'>
        <h2 className='page-title'>Productos</h2>
        <div className='productList__functions button-list'>
          <Link to='create' className='btn btn-success' role="button">
            <i className="bi bi-plus-circle"></i>
            Añadir producto
          </Link>
          <Modal button={{ label: `Borrar ${selected.length} (seleccionados)`, className: 'btn-danger', icon: <i className="bi bi-trash"></i> }} modal={modalDelete} id='deleteProduct' acceptFunction={deleteHandler} />
        </div>
      </div>
      <Filter>
        <FilterProductForm />
      </Filter>
      <ProductResults selectHandler={selectHandler} selected={selected} />
      <ItemPagination page={store.productPage} label='productos' query={actions.getProductPage} />
    </div>
  )
};
export default ProductList;