import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/system';
import {
  styleTableHeader,
  styleTableHeaderCell,
  styleTableBodyCell2,
  styleItemActive,
} from '../styleTableMui/style';
import { UserDeviceContext } from '../../contexts/UserDeviceContext';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const {
    userDeviceState: { userDevicesHistory, userDeviceLoading },
    getUserDevicesHistory,
  } = useContext(UserDeviceContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    getUserDevicesHistory();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - userDevicesHistory.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .MuiTablePagination-selectLabel {
       margin: 0;
    }
    & .MuiTablePagination-displayedRows {
    margin: 0;
    }
  `
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableHead sx={styleTableHeader}>
          <TableRow>
            <TableCell sx={styleTableHeaderCell}>ID</TableCell>
            <TableCell sx={styleTableHeaderCell}>Tên Nhân viên</TableCell>
            <TableCell sx={styleTableHeaderCell}>Chức vụ</TableCell>
            <TableCell sx={styleTableHeaderCell}>Thời điểm sử dụng</TableCell>
            <TableCell sx={styleTableHeaderCell}>Loại thiết bị</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? userDevicesHistory.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : userDevicesHistory
          ).map((item, index) => (
            <TableRow>
              <TableCell
                style={{ width: 160 }}
                sx={index % 2 ? styleItemActive : styleTableBodyCell2}
              >
                {item.id}
              </TableCell>
              <TableCell
                style={{ width: 160, fontWeight: 'bold' }}
                sx={index % 2 ? styleItemActive : styleTableBodyCell2}
              >
                {item.name}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                sx={index % 2 ? styleItemActive : styleTableBodyCell2}
              >
                {item.role}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                sx={index % 2 ? styleItemActive : styleTableBodyCell2}
              >
                {item.timeUse}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                sx={index % 2 ? styleItemActive : styleTableBodyCell2}
              >
                {item.deviceType}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <CustomTablePagination
              rowsPerPageOptions={[10, 15, 20, { label: 'All', value: -1 }]}
              colSpan={5}
              count={userDevicesHistory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
