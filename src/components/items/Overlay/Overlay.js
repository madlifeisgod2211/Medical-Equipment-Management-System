import React, { useContext } from 'react';
import { ItemContext } from '../../../contexts/ItemContext';
import AddIcon from '@mui/icons-material/Add';
import style from './Overlay.module.css';
import Button from '@mui/material/Button';
const Overlay = () => {
  const { setShowAddItemModal } = useContext(ItemContext);
  return (
    <Button
      className={style.container}
      onClick={setShowAddItemModal.bind(this, true)}
      variant='contained'
    >
      <div className={style.child}>
        <AddIcon /> Thêm thuốc/dụng cụ y tế mới
      </div>
    </Button>
  );
};

export default Overlay;
