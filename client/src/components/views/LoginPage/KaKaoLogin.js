import React, {useState, useEffect} from 'react';
import './LoginPage.scss';
import {jsKey} from './../../Config';

function KaKaoLogin() {
  useEffect(() => {
    window.KaKao.init(jsKey);
  }, []);

  const loginWithKakao = () => {
    window.KaKao.Auth.login({
      success: (response) => {
        console.log(response);
        // window.KaKao.Auth.setAccessToken(response.access_token);
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div>
      {/* <a className="kakaoLoginBtn" href={KAKAO_AUTH_URL}>
        카카오 로그인
      </a> */}
      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="250"
        />
      </a>
    </div>
  );
}

export default KaKaoLogin;
