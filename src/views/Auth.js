import React, { useContext } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import style from './Auth.module.css';
import { AuthContext } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;
  if (authLoading)
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  else if (isAuthenticated) return <Redirect to='/dashboard' />;
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );
  return (
    <>
      <div className={style.formAuth}>
        <h1>BIOMECH LAB</h1>
        <h4>HỆ THỐNG QUẢN LÝ THUỐC VÀ DỤNG CỤ TRONG BỆNH VIỆN</h4>
        {body}
      </div>
    </>
  );
};

export default Auth;
