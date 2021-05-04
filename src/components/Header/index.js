import React from 'react';
import { FaBars } from 'react-icons/fa';


function Header({toggled, handleToggleSidebar}) {
  return (
    <main className={`app ${toggled ? 'toggled' : ''}`}>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars size={18}/>
      </div>
    </main>
  )
};

export default Header;