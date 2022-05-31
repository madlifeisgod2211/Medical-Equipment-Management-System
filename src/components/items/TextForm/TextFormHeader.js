import React from 'react';
import style from './TextFormHeader.module.css';

const TextFormHeader = ({ header1, header2 }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.header1}>{header1}</div>
        <div className={style.header2}>{header2}</div>
        <hr />
      </div>
    </>
  );
};

export default TextFormHeader;
