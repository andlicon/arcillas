import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";
import Navbar from "./component/Navbar.jsx";
import { Footer } from "./component/footer";
import Menu from './component/Menu.jsx';
// pages
import Login from './pages/Login.jsx';
import ProductCreate from './pages/ProductCreate.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductEdit from './pages/ProductEdit.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ProductByCategory from './pages/ProductByCategory.jsx';

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Menu>
            <Navbar />
            <Routes>
              <Route element={<ProductByCategory />} path="/" />
              <Route element={<ProductByCategory />} path="/category/:categoryId" />
              <Route element={<Login />} path='/login' />
              <Route element={<ProductDetail />} path='/product/:productId' />
              <Route element={<h1>Welcome to dashboard</h1>} path='/admin/dashboard' />
              <Route element={<ProductList />} path='/admin/product' />
              <Route element={<ProductCreate />} path='/admin/product/create' />
              <Route element={<ProductEdit />} path='/admin/product/edit/:productId' />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
            <Footer />
          </Menu>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
