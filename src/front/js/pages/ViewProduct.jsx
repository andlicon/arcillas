import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import VerticalItemNavigation from '../component/VerticalItemNavigation.jsx';

const ViewProduct = () => {
  const { store } = useContext(Context);

  return (
    <div className='container'>
      <div className='row'>
        <VerticalItemNavigation col='col-3' itemList={store.categorys} />
        <div className="col-9">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga fugit blanditiis officia qui cumque asperiores harum modi iusto voluptates doloremque, optio maiores adipisci? Saepe repudiandae sed voluptatem, voluptatibus distinctio facere?
        </div>
      </div>
    </div>
  );
};
export default ViewProduct;