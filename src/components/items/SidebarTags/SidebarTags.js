import React from 'react';
import Tag from './Tag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import style from './SidebarTags.module.css';

const SidebarTags = () => {
  return (
    <>
      <div className={style.title}>Tính năng chung</div>
      <Tag
        tagName='Dashboard'
        link='/dashboard'
        icon={<DashboardIcon className={style.icon} />}
      />
      {/* <Tag
        tagName='Túi cấp cứu thông minh'
        link='/smartBag'
        icon={<MedicalServicesIcon className={style.icon} />}
      /> */}
      <Tag
        tagName='Smartbag #1'
        link='/smartBagTest'
        icon={<MedicalServicesIcon className={style.icon} />}
      />
      <Tag
        tagName='Cabinet'
        link='/cabinet'
        icon={<KitchenIcon className={style.icon} />}
      />
      <Tag
        tagName='Người dùng'
        link='/users'
        icon={<ManageAccountsIcon className={style.icon} />}
      />
      <Tag
        tagName='Nhật ký'
        link='/history'
        icon={<TextSnippetIcon className={style.icon} />}
      />
      <div className={style.title}>Hỗ trợ</div>
      <Tag
        tagName='Cài đặt'
        link='/settings'
        icon={<SettingsIcon className={style.icon} />}
      />
    </>
  );
};
export default SidebarTags;
