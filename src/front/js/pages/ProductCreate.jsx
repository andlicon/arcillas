import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/ProductCreate.css';
import BackTo from '../component/BackTo.jsx';
import PlainInput from '../component/PlainInput.jsx';
import {
  validateProductForm
} from '../utils/validateUtils.js';

const ProductCreate = () => {
  const { store, actions } = useContext(Context);
  const { categorys, units } = store;
  const { postProduct } = actions;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    description: '',
    usage: '',
    categoryId: categorys[0]?.id,
    unitId: units[0]?.id,
    image: undefined
  })

  useEffect(() => {
    const popOverList = document.getElementsByClassName('popOvers');
    for (let i = 0; i < popOverList.length; i++) {
      const pop = popOverList[i];
      const popover = new bootstrap.Popover(pop, null);
    }
  }, [])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(validateProductForm(values));
    if (validateProductForm(values)) {
      setLoading(true);
      const form = new FormData();
      form.append('name', values['name']);
      form.append('description', values['description']);
      form.append('usage', values['usage']);
      form.append('category_id', values['categoryId']);
      form.append('unit_id', values['unitId']);
      form.append('image', values['image']);
      await postProduct(form);
      setLoading(false);
    }
  }

  const onChangeInputHandler = ({ target }) => {
    if (target.type == 'file') {
      setValues({ ...values, [target.name]: target.files })
    }
    else {
      setValues({ ...values, [target.name]: target.value })
    }
  };

  const onChangeInput = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  };

  return (
    <>
      <div className='container'>
        <div className='productCreate__header'>
          <h1 className='productCreate__h1'>Añade un nuevo producto</h1>
          <BackTo to='/admin/product/list' text='Volver a la lista de productos' />
        </div>

        <form className='productCreate__form needs-validation' id='productCreate' noValidate onSubmit={onSubmitHandler}>
          <div className='d-flex justify-content-end'>
            <button className='btn' type='submit' disabled={loading}>
              <i className="bi bi-save-fill"></i>
              Guardar
            </button>
          </div>
          {/* PRODUCT INFORMATION */}
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
                  <PlainInput id='name' name='name' value={values['name']} label='Nombre' type='text' popOver='Nombre del producto' setValues={onChangeInput} invalidFeedback='Se debe especificar un nombre' required={true} />
                  <PlainInput id='description' name='description' value={values['description']} label='Descripción' type='text' popOver='Descripcin del producto' setValues={onChangeInput} invalidFeedback='Se debe proporcionar una descripción' required={true} />
                  <PlainInput id='usage' name='usage' value={values['usage']} label='Uso' type='text' popOver='Áreas o actividades en las que se usa' setValues={onChangeInput} invalidFeedback='Se debe especificar un nombre' required={true} />
                  {/* CATEGORY */}
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="categoryId">Categoria</label>
                      <span className="d-inline-block popOvers" tabIndex="-1" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Categoria del producto, solo se puede elegir 1">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <select className='col-9' name="categoryId" id="categoryId" onChange={onChangeInputHandler} value={values['categoryId']}>
                      {
                        categorys && categorys.map((element) => {
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
                  {/* UNIT */}
                  <div className='row'>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                      <label className='' htmlFor="unitId">Unidad</label>
                      <span className="d-inline-block popOvers" tabIndex="-1" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Categoria del producto, solo se puede elegir 1">
                        <button className="help btn" type="button" disabled>?</button>
                      </span>
                    </div>
                    <select className='col-9' name="unitId" id="unitId" onChange={onChangeInputHandler} value={values['unitId']}>
                      {
                        units && units.map((element) => {
                          return (
                            <option value={element.id} key={element.id}>
                              {
                                element.name
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
            {/* IMAGES */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#multimedia-collapse" aria-expanded="true" aria-controls="multimedia-collapse">
                  <i className="bi bi-images productCreate__image"></i>
                  Multimedia
                </button>
              </h2>
              <div id="multimedia-collapse" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <PlainInput id='image' name='image' value={undefined} label='Imagen' type='file' popOver='Imagen del producto' setValues={onChangeInput} invalidFeedback='La imagen del producto, debe ser jpg, jpge, png' required={false} />
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