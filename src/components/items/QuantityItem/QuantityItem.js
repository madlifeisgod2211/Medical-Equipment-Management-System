import React from 'react';
import style from './QuantityItem.module.css';
import Avatar from '@mui/material/Avatar';

const QuantityItem = ({ title, quantity, icon, color }) => {
  const colorStyle = {
    color: `${color}`,
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.child1}>
          <div className={style.subChild1}>{title}</div>
          <div className={style.subChild2} style={colorStyle}>
            {quantity}
          </div>
        </div>
        {/* <div className={style.child2}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              color: 'white',
              backgroundColor: `${color}`,
              boxShadow: '2px 2px 2px #ccc',
            }}
          >
            {icon}
          </Avatar>
        </div> */}
      </div>
    </>
  );
};

export default QuantityItem;
