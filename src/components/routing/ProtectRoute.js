import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';
import NavbarMenu from '../layout/NavbarMenu';
import Sidebar from '../layout/Sidebar';
import style from './ProtectRoute.module.css';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className='spinner-container'>
        <Spinner
          animation='border'
          variant='info'
          style={{ justifyContent: 'center', alignItems: 'center' }}
        />
      </div>
    );
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <div className={style.container}>
              <div className={style.containerSidebar}>
                <Sidebar />
              </div>
              <div className={style.containerBody}>
                <Component {...rest} {...props} />
              </div>
            </div>
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default ProtectedRoute;
