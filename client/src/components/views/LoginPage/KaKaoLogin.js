import React, {useEffect} from 'react';
import './LoginPage.scss';
import {jsKey} from './../../Config';
import {useDispatch} from 'react-redux';
import {registerUser, loginKakaoUser} from '../../../_actions/user_action';

const {Kakao} = window;

function KaKaoLogin(props) {
  const scope = 'profile_nickname, profile_image, account_email';
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(jsKey);
    }
  }, []);

  const loginWithKakao = () => {
    Kakao.Auth.login({
      scope,
      success: (res) => {
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log(res.kakao_account);

            const variables = {
              name: res.kakao_account.profile.nickname,
              email: res.kakao_account.email,
              image: res.kakao_account.profile.profile_image_url,
              iskakao: true,
            };

            dispatch(loginKakaoUser(variables)).then((response) => {
              if (response.payload.loginSuccess) {
                props.history.push('/');
              } else {
                dispatch(registerUser(variables)).then((response) => {
                  if (response.payload.success) {
                    dispatch(loginKakaoUser(variables)).then((response) => {
                      if (response.payload.loginSuccess) {
                        props.history.push('/');
                      } else {
                        alert('로그인에 실패하셨습니다.');
                      }
                    });
                  }
                });
              }
            });
          },
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div>
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
