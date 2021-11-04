import React, {useState} from 'react';
import './LoginPage.scss';

function LoginPage() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className="loginContent">
      <h1>WATCHED</h1>
      <p>Login</p>
      <form>
        <label>이메일</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <button>로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
