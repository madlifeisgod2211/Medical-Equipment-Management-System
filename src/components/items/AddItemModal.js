import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ItemContext } from '../../contexts/ItemContext';

const AddItemModal = () => {
  //Context
  const { setShowAddItemModal, showAddItemModal, addItem, setShowToast } =
    useContext(ItemContext);
  const [newItem, setnewItem] = useState({
    id: '',
    name: '',
    status: 0,
    createdTime: 'null',
    updatedTime: 'null',
  });
  const { id, name } = newItem;

  const onClose = () => {
    resetAddItemData();
  };
  const onSubmit = async e => {
    e.preventDefault();
    const { success, message } = await addItem(newItem);
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    resetAddItemData();
  };

  const onChangenewItemForm = e => {
    setnewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const resetAddItemData = () => {
    setnewItem({
      id: '',
      name: '',
      status: 0,
      createdTime: 'null',
      updatedTime: 'null',
    });
    setShowAddItemModal(false);
  };
  return (
    <Modal show={showAddItemModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm thiết bị cho hộp cấp cứu thông minh</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='ID'
              name='id'
              required
              aria-describedby='title-help'
              value={id}
              onChange={onChangenewItemForm}
            />
            <Form.Text id='title-help' muted>
              Yêu cầu
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Tên thiết bị'
              name='name'
              value={name}
              onChange={onChangenewItemForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Thêm thiết bị
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
