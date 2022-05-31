import React, { useContext } from 'react';
import style from './AvatarForm.module.css';
import avatar from '../../../assets/user.png';
import { AuthContext } from '../../../contexts/AuthContext';
const AvatarForm = () => {
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);
  return (
    <>
      <div className={style.container}>
        <div className={style.subDiv1}>
          <img src={avatar} alt='user' className={style.img} />
        </div>
        <div className={style.subDiv2}>{username}</div>
        <div className={style.subDiv3}>
          Vai trò: <i>{role}</i>
        </div>
      </div>
    </>
  );
};

export default AvatarForm;
