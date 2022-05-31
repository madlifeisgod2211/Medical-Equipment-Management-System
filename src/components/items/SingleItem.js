import React from 'react';
import ActionButtons from './ActionButtons/ActionButtons';
import style from './SingleItem.module.css';
const SingleItem = ({
  item: { id, name, status, createdTime, updatedTime },
}) => {
  return (
    <div
      className={
        status
          ? `${style.itemDiv} ${style.itemDivAvailable}`
          : `${style.itemDiv} ${style.itemDivUnavailable}`
      }
    >
      <div
        className={
          status
            ? `${style.itemSubDiv} ${style.subDiv1Available}`
            : `${style.itemSubDiv} ${style.subDiv1Unavailable}`
        }
      >
        {id}
      </div>
      <div
        className={
          status
            ? `${style.itemSubDiv} ${style.subDiv1Available}`
            : `${style.itemSubDiv} ${style.subDiv1Unavailable}`
        }
      >
        {name}
      </div>
      <div
        className={
          status
            ? `${style.itemSubDiv} ${style.subDiv1Available} ${style.subDivPlus}`
            : `${style.itemSubDiv} ${style.subDiv1Unavailable} ${style.subDivPlus}`
        }
      >
        <div style={{ fontSize: '16px' }}>
          Thời gian tạo: <i>{createdTime}</i>
        </div>
        <div style={{ fontSize: '16px' }}>
          Thời gian chỉnh sửa: <i>{updatedTime}</i>
        </div>
      </div>
      <div className={style.itemSubDiv}>
        <div className={style.sub1}>
          {status === 0 ? 'Chưa có sẵn' : 'Có sẵn'}
        </div>
        <div className={style.sub2}>
          <ActionButtons id={id} />
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
