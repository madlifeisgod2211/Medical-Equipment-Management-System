import React from 'react';
import style from './CabinetItem.module.css';
import cabinet from '../../../assets/wardrobe.png';
import cabinetInactive from '../../../assets/wardrobeInactive.png';
import InventoryIcon from '@mui/icons-material/Inventory';

const CabinetItem = ({ isActive }) => {
  let body;

  body = (
    <div className={isActive ? style.container : style.containerInactive}>
      <InventoryIcon sx={{ width: 150, height: 150 }} />
    </div>
  );

  return <>{body}</>;
};

export default CabinetItem;
