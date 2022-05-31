import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './login-register.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;
  const onChangeLoginForm = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const login = async e => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);

      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
      console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.formLogin}>
      <FaUserCircle size={56} style={{ color: 'black' }} />
      <Form className={style.form} onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Label>
          <strong>Tên người dùng</strong>
        </Form.Label>
        <Form.Group className={style.formGroup}>
          <Form.Control
            type='text'
            placeholder='Tên người dùng...'
            name='username'
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Label>
          <strong>Mật khẩu</strong>
        </Form.Label>
        <Form.Group className={style.formGroup}>
          <Form.Control
            type='password'
            placeholder='Mật khẩu...'
            name='password'
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button
          className={style.btn}
          variant='success btn-default'
          type='submit'
        >
          Đăng nhập
        </Button>
      </Form>
      <div className={style.textFooter}>
        Chưa có tài khoản?
        <Link to='/register'>
          <strong>Đăng ký</strong>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
