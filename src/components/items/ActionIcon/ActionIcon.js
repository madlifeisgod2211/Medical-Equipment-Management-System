import React, { useContext } from 'react';
import style from './ActionIcon.module.css';
import { ItemContext } from '../../../contexts/ItemContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const ActionIcon = ({ id, status }) => {
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
      <div className={style.container}>
        <div className={status ? style.childActive : style.childInactive}>
          <EditIcon onClick={chooseItem.bind(this, id)} />
        </div>
        <div className={status ? style.childActive : style.childInactive}>
          <DeleteForeverIcon onClick={deleteFunction.bind(this, id)} />
        </div>
      </div>
    </>
  );
};

export default ActionIcon;
