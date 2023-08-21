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

        <form>
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
                  <p>
                    name, description, usage
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <i className="bi bi-images productCreate__image"></i>
                  Multimedia
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <p>
                    image
                  </p>
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