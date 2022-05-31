import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { ItemContext } from '../../contexts/ItemContext';

const UpdateItemModal = () => {
  //Context
  const {
    itemState: { item },
    showUpdateItemModal,
    setShowUpdateItemModal,
    updateItem,
    setShowToast,
  } = useContext(ItemContext);

  //State
  const [updatedItem, setUpdatedItem] = useState([item]);
  useEffect(() => setUpdatedItem(item), [item]);
  const { id, name } = updatedItem;

  const closeDialog = () => {
    setUpdatedItem(item);
    setShowUpdateItemModal(false);
  };
  const onChangeUpdateItemForm = e => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Test');
    const { success, message } = await updateItem(updatedItem);
    console.log('Test after');
    setShowUpdateItemModal(false);
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showUpdateItemModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thiết bị</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='ID'
              name='id'
              value={id}
              required
              aria-describedby='title-help'
              onChange={onChangeUpdateItemForm}
            />
            <Form.Text id='title-help' muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Tên thiết bị'
              name='name'
              value={name}
              onChange={onChangeUpdateItemForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Chỉnh sửa thiết bị
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateItemModal;
