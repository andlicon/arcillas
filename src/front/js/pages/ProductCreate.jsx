import React from 'react';
import '../../styles/ProductCreate.css';
import BackTo from '../component/BackTo.jsx';

const ProductCreate = () => {
  return (
    <>
      <div className='container'>
        <div className='productCreate__header'>
          <h1 className='productCreate__h1'>Añade un nuevo producto</h1>
          <BackTo to='/admin/product/list' text='Volver a la lista de productos' />
        </div>

        <form className='productCreate__form'>
          <div className='d-flex justify-content-end'>
            <button className='btn' type='submit'>
              <i className="bi bi-save-fill"></i>
              Guardar
            </button>
          </div>
          {/* informacion del producto */}
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <i className="bi bi-info-lg productCreate__image"></i>
                  Información del producto
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className='row'>
                    <label className='col-3' htmlFor="name">Nombre</label>
                    <input className='col-9' id='name' type="text" />
                  </div>
                  <div className='row'>
                    <label className='col-3' htmlFor="description">Descripción</label>
                    <input className='col-9' id='description' type="text" />
                  </div>
                  <div className='row'>
                    <label className='col-3' htmlFor="usage">Uso</label>
                    <input className='col-9' id='usage' type="text" />
                  </div>
                  <div className='row'>
                    <label className='col-3' htmlFor="categoryId">Categoria</label>
                    <select className='col-9' name="categoryId" id="categoryId">
                      <option value="1">1</option>
                      <option value="1">2</option>
                    </select>
                  </div>
                  <div className='row'>
                    <label className='col-3' htmlFor="subCategoryId">Categoria</label>
                    <select className='col-9' name="subCategoryId" id="subCategoryId">
                      <option value="1">1</option>
                      <option value="1">2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* imagenes */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <i className="bi bi-images productCreate__image"></i>
                  Multimedia
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className='row'>
                    <label className='col-3' htmlFor="image">Imagen</label>
                    <input className='col-9' type='file' name="image" id="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div >
    </>
  )
};
export default ProductCreate;