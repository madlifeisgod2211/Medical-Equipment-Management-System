import React from 'react';
import DashboardItem from '../../components/items/DashboardItem/DashboardItem';
import style from './Dashboard.module.css';
import TableDashboard from './TableDashboard';
import smartbagImg from '../../assets/smartbag.jpg';
import cabinetImg from '../../assets/cabinet.jpg';
const Dashboard = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.cardContainer}>
          <DashboardItem
            link='/smartBagTest'
            header='Smart Bag'
            content=' Túi cấp cứu thông minh có tính năng quản lý và hiển thị số lượng thuốc và y cụ trong quá trình cấp cứu'
            img={smartbagImg}
          />

          <DashboardItem
            link='/cabinet'
            header='Cabinet'
            content=' Cabinet có tính năng quản lý số lượng thuốc và y cụ đồng thời kiểm soát nhân viên sử dụng khi có trường hợp mất mát/hư hỏng xảy ra.'
            img={cabinetImg}
          />
        </div>
        <div className={style.tableContainer}>
          <TableDashboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
