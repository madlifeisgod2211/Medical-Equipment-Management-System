import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  styleTableHeader,
  styleTableBody,
  styleTableHeaderCell,
  styleTableBodyCell,
} from '../styleTableMui/style';
import style from './Dashboard.module.css';
import { testData } from './testData';
import { UserDeviceContext } from '../../contexts/UserDeviceContext';

const TableDashboard = () => {
  const {
    userDeviceState: { userDevicesHistory, userDeviceLoading },
    getUserDevicesHistory,
  } = useContext(UserDeviceContext);
  useEffect(() => {
    setInterval(() => getUserDevicesHistory(), 2000);
  }, []);
  let subUserDevicesHistory = userDevicesHistory.slice(0, 3);
  console.log(userDevicesHistory);
  return (
    <>
      <div className={style.titleTable}>Người sử dụng gần đây</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead sx={styleTableHeader}>
            <TableRow>
              <TableCell sx={styleTableHeaderCell}>ID</TableCell>
              <TableCell sx={styleTableHeaderCell}>Tên Nhân viên</TableCell>
              <TableCell sx={styleTableHeaderCell}>Chức vụ</TableCell>
              <TableCell sx={styleTableHeaderCell}>Thời điểm sử dụng</TableCell>
              <TableCell sx={styleTableHeaderCell}>Loại thiết bị</TableCell>
            </TableRow>
          </TableHead>
          {subUserDevicesHistory.map(user => (
            <TableBody sx={styleTableBody}>
              <TableRow style={{ backgroundColor: '#ceeffa' }}>
                <TableCell sx={styleTableBodyCell}>{user.id}</TableCell>
                <TableCell
                  sx={styleTableBodyCell}
                  style={{ fontWeight: 'bold' }}
                >
                  {user.name}
                </TableCell>
                <TableCell sx={styleTableBodyCell}>{user.role}</TableCell>
                <TableCell sx={styleTableBodyCell}>{user.timeUse}</TableCell>
                <TableCell sx={styleTableBodyCell}>{user.deviceType}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default TableDashboard;
