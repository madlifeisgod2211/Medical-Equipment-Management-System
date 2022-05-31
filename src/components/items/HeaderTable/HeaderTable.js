import React from 'react';
import style from './HeaderTable.module.css';
const HeaderTable = () => {
  return (
    <div className={style.container}>
      <div className={`${style.itemSubDiv} ${style.sub}`}>ID</div>
      <div className={`${style.itemSubDiv} ${style.sub}`}>TÊN THIẾT BỊ</div>
      <div className={`${style.itemSubDiv} ${style.sub}`}>THỜI GIAN</div>
      <div className={style.itemSubDiv}>TRẠNG THÁI</div>
    </div>
  );
};

export default HeaderTable;
