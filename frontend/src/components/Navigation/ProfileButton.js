// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };



  return (
    <>
      <button id="menu" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle nav_user_icon"></i>     
       </button>
      {showMenu && (
        <div id="dropdown">
           <Link to="/user/spots" id="dropdown_second">
              See Your Listings
            </Link>
            <Link to="/spot/createSpot" id="dropdown_third">
              Host an Experience
            </Link>
          <div id="dropdown_last" onClick={logout}>Log Out</div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;