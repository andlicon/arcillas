import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirect = '/login', roleList }) => {
  const { store } = useContext(Context);

  if (store.token == null || !roleList.includes(store?.user?.role)) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}
export default ProtectedRoute;