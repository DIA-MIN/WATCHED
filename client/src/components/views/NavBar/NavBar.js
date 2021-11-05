import React, {useState} from 'react';
import {FaSearch, FaBars, FaClose, FaTimes} from 'react-icons/fa';
import './NavBar.scss';

function NavBar() {
  const [Clicked, setClicked] = useState(false);

  const onClickHandle = () => {
    setClicked(!Clicked);
  };

  return (
    <nav className="navContainer">
      <div className="logo">
        <a href="/">WATCHED</a>
      </div>

      <ul className={Clicked ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <form className="search">
            <input />
            <FaSearch className="search-icon" />
          </form>
        </li>
        <a href="/login">
          <li>로그인</li>
        </a>
        <a href="/register">
          <li>회원가입</li>
        </a>
      </ul>
      <div className="menu" onClick={onClickHandle}>
        {Clicked ? (
          <FaTimes className="toggle-icon" />
        ) : (
          <FaBars className="toggle-icon" />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
