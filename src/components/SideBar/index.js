import React, { useState } from 'react';

import Header from '../Header';
import Aside from '../Aside'
import './styles.scss';
function SideBar() {
  const [toggled, setToggled] = useState(false);
  
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  
  return (
    <>
      <Aside
        handleToggleSidebar={handleToggleSidebar}
        toggled={toggled}
      />
      <Header 
        handleToggleSidebar={handleToggleSidebar}
        toggled={toggled}
      />
    </>
  )
};

export default SideBar;