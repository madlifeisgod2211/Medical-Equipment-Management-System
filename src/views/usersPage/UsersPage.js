import React from 'react';
import style from './UsersPage.module.css';
import CustomPaginationActionsTable from './UserListTable';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
const Users = () => {
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
        <div className={style.child1}>Danh sách người sử dụng thiết bị</div>
        <div className={style.child2}>
          <CustomPaginationActionsTable />
        </div>
      </div>
    </>
  );
};

export default Users;
