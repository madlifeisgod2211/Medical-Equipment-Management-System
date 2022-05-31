import React from 'react';
import { Link } from 'react-router-dom';
import style from './SidebarTags.module.css';

const Tag = ({ icon, tagName, link }) => {
  return (
    <Link to={link} className={style.link}>
      <div className={style.container}>
        <div>{icon}</div>
        <div className={style.tagName}>{tagName}</div>
      </div>
    </Link>
  );
};

export default Tag;
