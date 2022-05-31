import React from 'react';
import TextForm from '../../components/items/TextForm/TextForm';
import style from './SettingPage.module.css';
import { Button } from '@mui/material';
import TextFormHeader from '../../components/items/TextForm/TextFormHeader';
import UserInfor from '../../components/items/UserInfor/UserInfor';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';

const SettingPage = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.backIcon}>
          <span>
            <Link to='/'>
              <Avatar className={style.avatar}>
                <ArrowBackIcon />
              </Avatar>
            </Link>
          </span>
        </div>
        <div className={style.container1}>
          <div className={style.child1}>
            <UserInfor />
          </div>
          <div className={style.child2}>
            <TextFormHeader header1='Mật khẩu' header2='Chỉnh sửa mật khẩu' />
            <TextForm label='Mật khẩu cũ...' />
            <TextForm label='Mật khẩu mới...' />
            <TextForm label='Xác nhận mật khẩu mới...' />
            <Button variant='contained'>Lưu thay đổi</Button>
          </div>
        </div>
        <div className={style.container1}>
          <div className={style.child3}>
            <TextFormHeader
              header1='Thông tin người dùng'
              header2='Chỉnh sửa thông tin người dùng'
            />
            <TextForm label='Mã số nhân viên.' />
            <TextForm label='Họ và tên' />
            <TextForm label='Số điện thoại' />
            <div className={style.btnContainer}>
              <div>
                <Button variant='contained'>Lưu thay đổi</Button>
              </div>
              <div>
                <Button variant='contained' color='error'>
                  Xoá người dùng
                </Button>
              </div>
            </div>
          </div>
          <div className={style.child4}>
            <TextFormHeader header1='Tài khoản' header2='Quản lý tài khoản' />
            <Button variant='contained' color='error'>
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
