import React, { useContext } from 'react';
import { ItemContext } from '../../../contexts/ItemContext';
import style from './ItemInfor.module.css';

const ItemInfor = () => {
  const {
    itemState: { items },
  } = useContext(ItemContext);
  let activeItems = items.filter(item => item.status === 1);
  return (
    <>
      <div className={style.sub}>
        <strong>Tổng cộng số thiết bị: </strong>
        <strong>{items.length}</strong>
      </div>
      <div className={style.sub}>
        <strong>Thiết bị có sẵn: </strong>
        <strong style={{ color: 'green' }}>{activeItems.length}</strong>
      </div>
      <div className={style.sub}>
        <strong>Thiết bị chưa có sẵn: </strong>
        <strong style={{ color: 'red' }}>
          {items.length - activeItems.length}
        </strong>
      </div>
    </>
  );
};

export default ItemInfor;
