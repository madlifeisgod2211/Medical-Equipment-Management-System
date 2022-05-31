import React from 'react';
import style from './DisplayTime.module.css';

const DisplayTime = ({ time1, time2 }) => {
  return (
    <>
      <div className={style.sub}>
        <strong>
          Thời gian hiện tại: <span style={{ color: '#0d6efd' }}>{time1}</span>
        </strong>
      </div>
      <div className={style.sub}>
        <strong>
          Ngày/tháng/năm: <span style={{ color: '#0d6efd' }}>{time2}</span>
        </strong>
      </div>
    </>
  );
};

export default DisplayTime;
