// HeaderNav.js

import React from 'react';

const HeaderNav = ({ onLogoClick, onNavListItemClick, onMyTicketsClick, handleLogOut }) => {
  return (
    <div className="menu10">
      <button className="logo6" onClick={onLogoClick}>
        Fluxbus
      </button>
      <div className="menu11">
        <button className="nav-list-item12" onClick={onNavListItemClick}>
          <div className="plan-your-trip6">Plan Your Trip</div>
        </button>
        <button className="nav-list-item12" onClick={onMyTicketsClick}>
          <div className="plan-your-trip6">My Tickets</div>
        </button>
        <button className="nav-list-item8" onClick={handleLogOut}>
          <div className="plan-your-trip3">Log Out</div>
        </button>
      </div>
    </div>
  );
};

export default HeaderNav;
