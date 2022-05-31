import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import style from './UserInfor.module.css';
const UserInfor = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  return (
    <>
      <h3>{username}</h3>
      <div className={style.container}>
        <div className={style.child1}>
          <div>MSNV:</div>
          <div>Email:</div>
          <div>Vai trò:</div>
          <div>Ngày tạo:</div>
        </div>
        <div className={style.child1}>
          <img classsName={style.img} src='/' />
        </div>
      </div>
    </>
  );
};

export default UserInfor;
