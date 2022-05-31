import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './login-register.module.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
  //Context
  const { registerUser } = useContext(AuthContext);

  //Alert
  const [alert, setAlert] = useState(null);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const { username, password, confirmPassword, role } = registerForm;

  const onChangeRegisterForm = e => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const register = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Mật khẩu không khớp' });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!register.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
      }
      console.log(registerData);
    } catch (error) {
      console.log(error);
    }
  };

  // const register = () => {};
  return (
    <div className={style.formLogin}>
      <FaUserCircle size={56} style={{ color: 'black' }} />
      <AlertMessage info={alert} />
      <Form className={style.form} onSubmit={register}>
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
            onChange={onChangeRegisterForm}
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
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Label>
          <strong>Nhập lại mật khẩu</strong>
        </Form.Label>
        <Form.Group className={style.formGroup}>
          <Form.Control
            type='password'
            placeholder='Nhập lại mật khẩu...'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button
          className={style.btn}
          variant='success btn-default'
          type='submit'
        >
          Đăng ký
        </Button>
      </Form>
      <div className={style.textFooter}>
        Đã có tài khoản?
        <Link to='/login'>
          <strong>Đăng nhập</strong>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
