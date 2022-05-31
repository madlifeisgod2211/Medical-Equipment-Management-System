import React from 'react';
import AvatarForm from '../items/AvatarForm/AvatarForm';
import SidebarTags from '../items/SidebarTags/SidebarTags';
import style from './Sidebar.module.css';
const Sidebar = () => {
  return (
    <>
      <AvatarForm />
      <div className={style.subListSidebar}>
        <SidebarTags />
      </div>
    </>
  );
};

export default Sidebar;
