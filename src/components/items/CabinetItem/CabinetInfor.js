import React from 'react';
import style from './CabinetItem.module.css';

const CabinetInfor = ({ title, quantity }) => {
  return (
    <>
      <div className={style.title}>
        {title}: {quantity}
      </div>
    </>
  );
};

export default CabinetInfor;
