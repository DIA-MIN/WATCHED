import React, {useEffect} from 'react';
import './LoginPage.scss';
import {jsKey} from './../../Config';
import {useDispatch} from 'react-redux';
import {registerUser, checkUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

const {Kakao} = window;

function KaKaoLogin(props) {
  const scope = 'profile_nickname, profile_image, account_email';
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(jsKey);
      console.log(Kakao.isInitialized());
    }
  }, []);

  const loginWithKakao = () => {
    Kakao.Auth.login({
      scope,
      success: (res) => {
        // console.log('token?', res);
        // Kakao.Auth.setAccessToken(res.access_token);

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

            dispatch(checkUser(variables)).then((response) => {
              if (!response.payload.isUser) {
                dispatch(registerUser(variables)).then((response) => {
                  if (response.payload.success) {
                    props.history.push('/');
                  } else {
                    alert('로그인에 실패 하셨습니다.');
                  }
                });
              } else {
                props.history.push('/');
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

export default withRouter(KaKaoLogin);
