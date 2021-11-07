import React, {useState} from 'react';
import './LoginPage.scss';
import Axios from 'axios';

function LoginPage(props) {
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

    Axios.post('/api/users/login', variables).then((response) => {
      if (response.data.loginSuccess) {
        console.log(response.data);
        props.history.push('/');
      } else {
        alert('로그인에 실패하셨습니다.');
      }
    });
  };

  return (
    <div className="loginContent">
      <h1>WATCHED</h1>
      <p>Login</p>
      <form onSubmit={onSubmitForm}>
        <label>이메일</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <button onSubmit={onSubmitForm}>로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
