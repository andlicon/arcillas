import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import ProductCard from '../component/ProductCard.jsx'

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store.message || "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
      <div className='d-flex'>
        <ProductCard product={{
          id: 1,
          image_url: 'https://cc-prod.scene7.com/is/image/CCProdAuthor/how_to_cut_out_images_photoshop_P1_mobile_360x270?$pjpeg$&jpegSize=200&wid=720',
          name: 'Para poceta y lavaplatos',
          brand: 'Tubrica',
          description: 'Para poceta y lavaplatos'
        }} />
      </div>
    </div>
  );
};
