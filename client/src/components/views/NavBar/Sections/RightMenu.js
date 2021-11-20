import React from 'react';
import {FaSearch, FaStar, FaHeart} from 'react-icons/fa';
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
      <ul className={props.isClicked ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <form className="search">
            <input />
            <FaSearch className="search-icon" />
          </form>
        </li>
        <li
          onClick={() => {
            props.history.push('/login');
          }}
        >
          로그인
        </li>
        <li
          onClick={() => {
            props.history.push('/register');
          }}
        >
          회원가입
        </li>
      </ul>
    );
  } else {
    return (
      <ul className={props.isClicked ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <form className="search">
            {/* Memo
             * https://api.themoviedb.org/3/search/movie?api_key=###&query=검색할 영화 제목
             */}
            <input />
            <FaSearch className="search-icon" />
          </form>
        </li>
        <li className="pickContent">
          <FaHeart className="heart-icon" />
          My Pick
        </li>
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
        <li onClick={onClickLogout}>로그아웃</li>
      </ul>
    );
  }
}

export default withRouter(RightMenu);
