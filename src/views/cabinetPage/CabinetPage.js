import React from 'react';
import CabinetItem from '../../components/items/CabinetItem/CabinetItem';
import CabinetInfor from '../../components/items/CabinetItem/CabinetInfor';

import style from './CabinetPage.module.css';

const CabinetPage = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.child1}>Danh sách các Cabinet hiện có</div>
        <div className={style.child2}>
          <div className={style.cabinetItem}>
            <CabinetItem isActive='true' />
            <CabinetItem />
            <CabinetItem />
            <CabinetItem />
            <CabinetItem />
            <CabinetItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default CabinetPage;
