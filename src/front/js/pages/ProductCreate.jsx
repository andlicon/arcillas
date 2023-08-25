import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/ProductCreate.css';
import {
  activatePopOvers
} from '../utils/domUtils.js'
import BackTo from '../component/BackTo.jsx';
import PlainInput from '../component/PlainInput.jsx';
import PlainSelect from '../component/PlainSelect.jsx';
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
    activatePopOvers();
  }, [])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
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
          <BackTo to='/admin/product' text='Volver a la lista de productos' />
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
                  <PlainSelect id='categoryId' name='categoryId' value={values['categoryId']} label='Categoría' popOver='Categoría del producto, solo puede poseer 1' setValues={onChangeInput} invalidFeedback='Se debe especificar una categoría' required={true} list_items={categorys} />
                  <PlainSelect id='unitId' name='unitId' value={values['unitId']} label='Unidad' popOver='Unidad en la que se presenta el producto' setValues={onChangeInput} invalidFeedback='Se debe especificar una unidad' required={true} list_items={units} />
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