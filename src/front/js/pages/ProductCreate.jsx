import React, { useEffect } from 'react';
import '../../styles/ProductCreate.css';
import BackTo from '../component/BackTo.jsx';

const ProductCreate = () => {
  useEffect(() => {
    const popOverList = document.getElementsByClassName('popOvers');
    for (let i = 0; i < popOverList.length; i++) {
      const pop = popOverList[i];
      const popover = new bootstrap.Popover(pop, null);
    }
  }, [])

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
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#info-collapse" aria-expanded="true" aria-controls="info-collapse">
                  <i className="bi bi-info-lg productCreate__image"></i>
                  Información del producto
                </button>
              </h2>
              <div id="info-collapse" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="name">Nombre</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Nombre del producto">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' id='name' type="text" />
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="description">Descripción</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Descripcin del producto">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' id='description' type="text" />
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="usage">Uso</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Áreas o actividades en las que se usa">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' id='usage' type="text" />
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="categoryId">Categoria</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Categoria del producto, solo se puede elegir 1">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <select className='col-9' name="categoryId" id="categoryId">
                      <option value="1">1</option>
                      <option value="1">2</option>
                    </select>
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="subCategoryId">Sub-Categoria</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Sub categoria del producto, se puede elegir 1 o ninguno">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
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
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#multimedia-collapse" aria-expanded="false" aria-controls="multimedia-collapse">
                  <i className="bi bi-images productCreate__image"></i>
                  Multimedia
                </button>
              </h2>
              <div id="multimedia-collapse" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='col-3' htmlFor="image">Imagen</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Imagen del producto, debe ser jpg, jpge, png">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' type='file' name="image" id="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form >
      </div >
    </>
  )
};
export default ProductCreate;