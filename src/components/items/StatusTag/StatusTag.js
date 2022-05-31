import React from 'react';
import style from './StatusTag.module.css';

const StatusTag = ({ status, color }) => {
  let body = (
    <div
      className={status ? style.containerActive : style.containerInactive}
      style={{ color: `${color}` }}
    >
      <div>{status ? 'Có sẵn' : 'Chưa có sẵn'}</div>
    </div>
  );
  return <div>{body}</div>;
};

export default StatusTag;
