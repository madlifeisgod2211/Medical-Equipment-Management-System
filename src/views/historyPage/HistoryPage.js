import React from 'react';
import style from './HistoryPage.module.css';
import CustomPaginationActionsTable from './HistoryTablePagination';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';

const HistoryPage = () => {
  return (
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
        <div className={style.child1}>Người sử dụng gần đây</div>
        <div className={style.child2}>
          <CustomPaginationActionsTable />
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
