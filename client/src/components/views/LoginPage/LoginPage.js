import React, {useState} from 'react';
import './LoginPage.scss';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {message} from 'antd';
import KaKaoLogin from './KaKaoLogin';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const variables = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(variables)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem('user_id', response.payload.userId);
        props.history.push('/');
      } else {
        message.error('아이디 또는 비밀번호를 다시 확인해주세요.');
      }
    });
  };

  return (
    <div className="loginContent">
      <h1>WATCHED</h1>
      <p>Login</p>
      <div className="loginApart"></div>
      <form onSubmit={onSubmitForm}>
        <label>이메일</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <button onSubmit={onSubmitForm}>로그인</button>
      </form>
      <KaKaoLogin {...props} />
    </div>
  );
}

export default LoginPage;
