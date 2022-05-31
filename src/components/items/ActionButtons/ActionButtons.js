import React, { useContext, useState } from 'react';
import style from './ActionButtons.module.css';
import editIcon from '../../../assets/pencil.svg';
import deleteIcon from '../../../assets/trash.svg';
import { ItemContext } from '../../../contexts/ItemContext';
const ActionButtons = ({ id, name }) => {
  const { deleteItem, findItem, setShowUpdateItemModal, setShowToast } =
    useContext(ItemContext);

  const chooseItem = itemId => {
    findItem(itemId);
    setShowUpdateItemModal(true);
  };

  const deleteFunction = async itemId => {
    const { success, message } = await deleteItem(itemId);
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };
  return (
    <>
      <button className={style.btn} onClick={chooseItem.bind(this, id)}>
        <img src={editIcon} alt='edit' width='16' height='16' />
      </button>
      <button className={style.btn} onClick={deleteFunction.bind(this, id)}>
        <img src={deleteIcon} alt='delete' width='16' height='16' />
      </button>
    </>
  );
};

export default ActionButtons;
