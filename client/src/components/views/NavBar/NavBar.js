import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="navContainer">
      <div className="logo">
        <span>WATCHED</span>
      </div>
      <form className="search">
        <input />
        <FaSearch className="search-icon" />
      </form>
      <span></span>
      <ul className="nav-menu">
        <li>로그인</li>
        <li>회원가입</li>
      </ul>
    </nav>
  );
}

export default NavBar;
