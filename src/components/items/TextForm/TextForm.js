import React from 'react';
import { TextField } from '@mui/material';
import style from './TextForm.module.css';

const TextForm = ({ label }) => {
  return (
    <>
      <div className={style.container}>
        <TextField
          className={style.textField}
          id='outlined-basic'
          label={label}
          variant='outlined'
        />
      </div>
    </>
  );
};

export default TextForm;
