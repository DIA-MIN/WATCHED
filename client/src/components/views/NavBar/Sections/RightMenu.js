import React from 'react';
import {FaSearch, FaStar} from 'react-icons/fa';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Avatar} from 'antd';
import {withRouter} from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector((state) => state.user);

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
      <div>
        <ul className={props.isClicked ? 'nav-menu active' : 'nav-menu'}>
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
      </div>
    );
  } else {
    return (
      <ul className={props.isClicked ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <form className="search">
            <input />
            <FaSearch className="search-icon" />
          </form>
        </li>
        <a href>
          <li className="pickContent">
            <FaStar className="star-icon" />
            My Pick
          </li>
        </a>
        {user.userData && (
          <li className="profileContent">
            <Avatar
              shape="square"
              size="small"
              src={user.userData.image}
              alt="profileimg"
            />
            <span>{user.userData.name}</span>
          </li>
        )}

        <a onClick={onClickLogout}>
          <li>로그아웃</li>
        </a>
      </ul>
    );
  }
}

export default withRouter(RightMenu);
