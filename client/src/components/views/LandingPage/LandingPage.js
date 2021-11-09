import React from 'react';
import Axios from 'axios';

const {Kakao} = window;

function LandingPage(props) {
  const logoutWithKakao = () => {
    if (Kakao.Auth.getAccessToken()) {
      console.log(
        '카카오 인증 액세스 토큰이 존재합니다.',
        Kakao.Auth.getAccessToken()
      );
      Kakao.Auth.logout(() => {
        console.log('로그아웃 되었습니다.', Kakao.Auth.getAccessToken());
        props.history.push('/');
      });
    } else {
      console.log('토큰이 존재하지 않습니다.');
    }
  };

  const onClickLogout = () => {
    Axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('로그아웃 실패!');
      }
    });
  };

  return (
    <div>
      LandingPage
      <br />
      <br />
      <button style={{border: '1px solid black'}} onClick={onClickLogout}>
        Logout
      </button>
      <br />
      <br />
      <button style={{border: '1px solid black'}} onClick={logoutWithKakao}>
        Kakao Logout
      </button>
    </div>
  );
}

export default LandingPage;
