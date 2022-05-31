import React, { useContext, useEffect } from 'react';
import { ItemContext } from '../../contexts/ItemContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StatusTag from '../../components/items/StatusTag/StatusTag';
import { Spinner, Toast } from 'react-bootstrap';
import AddItemModal from '../../components/items/AddItemModal';
import UpdateItemModal from '../../components/items/UpdateItemModal';
import Overlay from '../../components/items/Overlay/Overlay';
import style from './TestPage.module.css';
import {
  styleItemActive,
  styleItemInActive,
  styleTableHeader,
  styleTableBody,
  styleTableHeaderCell,
  styleTableBodyCell,
} from '../styleTableMui/style';
import ActionIcon from '../../components/items/ActionIcon/ActionIcon';
import QuantityItem from '../../components/items/QuantityItem/QuantityItem';
import FunctionsIcon from '@mui/icons-material/Functions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const TestPage = () => {
  const {
    itemState: { item, items, itemLoading },
    checkRfidTags,
    getItems,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ItemContext);

  useEffect(() => {
    setInterval(() => {
      checkRfidTags();
      getItems();
    }, 2000);
  }, []);

  let activeItems = items.filter(item => item.status === 1);

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
        <div className={style.container}>
          <div className={style.child1}>
            <div className={style.notify}>
              XIN LỖI, KHÔNG CÓ DỮ LIỆU ĐỂ HIỂN THỊ!
            </div>
            <div className={style.required}>
              VUI LÒNG RELOAD LẠI TRANG ĐỂ LẤY DỮ LIỆU!
            </div>
          </div>
        </div>
      </>
    );
  else
    body = (
      <>
        <div className={style.container}>
          <div className={style.backIcon}>
            <span>
              <Link to='/'>
                <Avatar className={style.avatar}>
                  <ArrowBackIcon />
                </Avatar>
              </Link>
            </span>
          </div>
          <div className={style.child1}>
            <div className={style.subChild1}>
              Chi tiết thiết bị trong SmartBag #1
            </div>
          </div>

          <div className={style.child2}>
            <div>
              <QuantityItem
                title='Tống loại thuốc/thiết bị hiện có'
                quantity={items.length}
                color='black'
                icon={<FunctionsIcon fontSize='large' />}
              />
            </div>
            <div>
              <QuantityItem
                title='Số thuốc/thiết bị có sẵn'
                quantity={activeItems.length}
                color='blue'
                icon={<DoneIcon fontSize='large' />}
              />
            </div>
            <div>
              <QuantityItem
                title='Số thuốc/thiết bị chưa có sẵn'
                quantity={items.length - activeItems.length}
                color='red'
                icon={<HighlightOffIcon fontSize='large' />}
              />
            </div>
            <div>
              <Overlay />
            </div>
          </div>
          <div className={style.child3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead sx={styleTableHeader}>
                  <TableRow>
                    <TableCell sx={styleTableHeaderCell}>ID</TableCell>
                    <TableCell sx={styleTableHeaderCell}>Tên</TableCell>
                    <TableCell sx={styleTableHeaderCell}>Số lượng</TableCell>
                    <TableCell sx={styleTableHeaderCell}>
                      Ngày hết hạn
                    </TableCell>
                    <TableCell sx={styleTableHeaderCell}>
                      Ngày cập nhật
                    </TableCell>
                    <TableCell sx={styleTableHeaderCell}>Trạng thái</TableCell>
                    <TableCell sx={styleTableHeaderCell}>
                      Chỉnh sửa/Xoá
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={styleTableBody}>
                  {items.map(item => (
                    <TableRow
                      key={item.name}
                      sx={item.status ? styleItemActive : styleItemInActive}
                    >
                      <TableCell sx={styleTableBodyCell}>{item.id}</TableCell>
                      <TableCell
                        sx={styleTableBodyCell}
                        style={{ fontWeight: 'bold' }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell sx={styleTableBodyCell}>
                        <span>100</span>/<strong>100</strong>
                      </TableCell>
                      <TableCell sx={styleTableBodyCell}>
                        {item.updatedTime}
                      </TableCell>
                      <TableCell sx={styleTableBodyCell}>
                        {item.updatedTime}
                      </TableCell>
                      <TableCell sx={styleTableBodyCell}>
                        <StatusTag status={item.status} />
                      </TableCell>
                      <TableCell>
                        <ActionIcon id={item.id} status={item.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </>
    );

  return (
    <>
      {body}
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

export default TestPage;
