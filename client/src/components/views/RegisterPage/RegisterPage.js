import React from 'react';
import './RegisterPage.scss';

function RegisterPage() {
  return (
    <div className="content">
      <h1 className="title">
        <span>WATCHED</span>에 가입하고 영화를 평가해 보세요.
      </h1>
      <br />
      <p className="subtitle">Welcome to WATCHED!</p>
      <form onSubmit>
        <label>이메일을 입력해주세요.</label>
        <div>
          <label>→</label>
          <input type="email" value onChange />
          <button onClick>다음</button>
        </div>
        <label>사용자 이름을 입력해주세요.</label>
        <div>
          <label>→</label>
          <input type="text" value onChange />
          <button onClick>다음</button>
        </div>
        <label>비밀번호를 입력해주세요.</label>
        <div>
          <label>→</label>
          <input type="password" value onChange />
          <button onClick>다음</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
