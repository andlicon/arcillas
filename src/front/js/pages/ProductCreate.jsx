import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/ProductCreate.css';
import BackTo from '../component/BackTo.jsx';

const initialValues = {
  name: '',
  description: '',
  usage: '',
  categoryId: undefined,
  image: undefined
}

const ProductCreate = () => {
  const { store, actions } = useContext(Context);
  const { categorys } = store;
  const { postProduct } = actions;
  const [values, setValues] = useState({
    name: '',
    description: '',
    usage: '',
    categoryId: categorys[0].id,
    image: undefined
  })

  useEffect(() => {
    const popOverList = document.getElementsByClassName('popOvers');
    for (let i = 0; i < popOverList.length; i++) {
      const pop = popOverList[i];
      const popover = new bootstrap.Popover(pop, null);
    }
  }, [])

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('name', values['name']);
    form.append('description', values['description']);
    form.append('usage', values['usage']);
    form.append('category_id', values['categoryId']);
    form.append('unit_id', 1);
    form.append('image', values['image'][0]);
    postProduct(form);
  }

  const onChangeInputHandler = ({ target }) => {
    if (target.type == 'file') {
      setValues({ ...values, [target.name]: target.files })
    }
    else {
      setValues({ ...values, [target.name]: target.value })
    }
  };

  return (
    <>
      <div className='container'>
        <div className='productCreate__header'>
          <h1 className='productCreate__h1'>Añade un nuevo producto</h1>
          <BackTo to='/admin/product/list' text='Volver a la lista de productos' />
        </div>

        <form className='productCreate__form' onSubmit={onSubmitHandler}>
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
                    <input className='col-9' id='name' name='name' type="text" onChange={onChangeInputHandler} value={values['name']} />
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="description">Descripción</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Descripcin del producto">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' id='description' name='description' type="text" onChange={onChangeInputHandler} value={values['description']} />
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="usage">Uso</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Áreas o actividades en las que se usa">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' id='usage' name='usage' type="text" onChange={onChangeInputHandler} value={values['usage']} />
                  </div>
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="categoryId">Categoria</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Categoria del producto, solo se puede elegir 1">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <select className='col-9' name="categoryId" id="categoryId" onChange={onChangeInputHandler} value={values['categoryId']}>
                      {
                        categorys && categorys.map((element, index) => {
                          return (
                            <option value={element.id} key={element.id}>
                              {
                                element.hierarchy_name
                              }
                            </option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* imagenes */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#multimedia-collapse" aria-expanded="true" aria-controls="multimedia-collapse">
                  <i className="bi bi-images productCreate__image"></i>
                  Multimedia
                </button>
              </h2>
              <div id="multimedia-collapse" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="image">Imagen</label>
                      <span className="d-inline-block popOvers" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Imagen del producto, debe ser jpg, jpge, png">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <input className='col-9' type='file' name="image" id="image" onChange={onChangeInputHandler} />
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