import React, {useState} from 'react';
import {FaSearch, FaBars, FaClose, FaTimes} from 'react-icons/fa';
import './NavBar.scss';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function NavBar(props) {
  const user = useSelector((state) => state.user);
  const [Clicked, setClicked] = useState(false);

  const onClickHandle = () => {
    setClicked(!Clicked);
  };

  const onClickLogout = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        console.log(response.data);
        localStorage.clear();

        props.history.push('/login');
      } else {
        alert('로그아웃에 실패하셨습니다.');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
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
  } else {
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
          <a onClick={onClickLogout}>
            <li>로그아웃</li>
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
}

export default withRouter(NavBar);
