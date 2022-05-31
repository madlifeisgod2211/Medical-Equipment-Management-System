import React, { useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import { Button } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import './NavbarMenu.css';
const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand='lg' bg='myColor'>
      <Navbar.Brand className='font-weight-bolder text-white'>
        <Nav.Link
          className='font-weight-bolder text-white'
          to='dashboard'
          as={Link}
        >
          HỆ THỐNG QUẢN LÝ THUỐC VÀ DỤNG CỤ Y TẾ TRONG BỆNH VIỆN
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'></Nav>
        <Nav>
          <Nav.Link
            className='font-weight-bolder text-white'
            disabled
          ></Nav.Link>
          <Nav.Link className='font-weight-bolder text-white' disabled>
            Chào mừng {username}
          </Nav.Link>
          <Nav.Link className='font-weight-bolder text-white'>
            <LogoutIcon
              style={{ marginRight: '5px', color: 'white' }}
              onClick={logout}
            />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
