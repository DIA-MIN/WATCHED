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

  return <div>LandingPage</div>;
}

export default LandingPage;
