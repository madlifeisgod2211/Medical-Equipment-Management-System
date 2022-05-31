import React, { useEffect, useContext } from 'react';
import { ItemContext } from '../../contexts/ItemContext';
import { Spinner, Toast } from 'react-bootstrap';
import style from './SmartBagPage.module.css';
import AddItemModal from '../../components/items/AddItemModal';
import UpdateItemModal from '../../components/items/UpdateItemModal';
import HeaderTable from '../../components/items/HeaderTable/HeaderTable';
import Overlay from '../../components/items/Overlay/Overlay';
import ItemInfor from '../../components/items/ItemInfor/ItemInfor';
import DisplayTime from '../../components/items/DisplayTime/DisplayTime';
import DisplayParametes from '../../components/items/DisplayParameters/DisplayParametes';
import SingleItem from '../../components/items/SingleItem';

const SmartBagPage = () => {
  const {
    itemState: { item, items, itemLoading },
    getItems,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ItemContext);
  // useEffect(() => getItems(), []);
  // useEffect(() => {
  //   setInterval(() => getItems(), 1000);
  // }, []);
  var today = new Date();
  var time1 =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var time2 =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

  console.log(items);
  let body;
  if (itemLoading)
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  else if (items.length === 0)
    body = (
      <>
        <div className='text-center'>
          <h1>XIN LỖI, KHÔNG CÓ DỮ LIỆU ĐỂ HIỂN THỊ|</h1>
          <h2>VUI LÒNG RELOAD LẠI TRANG ĐỂ LẤY DỮ LIỆU!</h2>
        </div>
      </>
    );
  else {
    body = (
      <>
        <h3>DANH SÁCH THIẾT BỊ TRONG TÚI CẤP CỨU THÔNG MINH</h3>
        <div className={style.inforDiv}>
          <div className={style.child}>
            <ItemInfor />
          </div>
          <div className={style.child}>
            <DisplayParametes />
          </div>
          <div className={style.child}>
            <DisplayTime time1={time1} time2={time2} />
          </div>
        </div>
        <HeaderTable />
        <div className={style.singleItem}>
          {items.map(item => (
            <SingleItem item={item} />
          ))}
        </div>
        <Overlay />
      </>
    );
  }
  return (
    <>
      <div className={style.subBody}>{body}</div>
      <AddItemModal />
      {item !== null && <UpdateItemModal />}
      <Toast
        show={show}
        style={{ position: 'fixed', bottom: '30px', left: '40px' }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: '',
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body style={{ textAlign: 'center' }}>
          <h5>{message}</h5>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default SmartBagPage;
