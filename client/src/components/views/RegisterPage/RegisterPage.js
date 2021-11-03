import React, {useState} from 'react';
import './RegisterPage.scss';

function RegisterPage() {
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [EmailCheck, setEmailCheck] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [PasswordCheck, setPasswordCheck] = useState(false);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onEmailCheck = () => {
    setEmailCheck(true);
  };

  const onNameCheck = () => {
    setNameCheck(true);
  };

  const onPasswordCheck = () => {
    setPasswordCheck(true);
  };

  const inputName = (
    <>
      <label>사용자 이름을 입력해주세요.</label>
      <div>
        <label>→</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        {NameCheck ? null : (
          <button type="button" onClick={onNameCheck}>
            다음
          </button>
        )}
      </div>
    </>
  );

  const inputPassword = (
    <>
      <label>비밀번호를 입력해주세요.</label>
      <div>
        <label>→</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        {PasswordCheck ? null : (
          <button type="button" onClick={onPasswordCheck}>
            다음
          </button>
        )}
      </div>
    </>
  );

  const register = (
    <>
      <button className="registerBtn" onClick>
        Let's go WATCHED
      </button>
    </>
  );

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
          <input type="email" value={Email} onChange={onEmailHandler} />
          {EmailCheck ? null : (
            <button type="button" onClick={onEmailCheck}>
              다음
            </button>
          )}
        </div>
        {EmailCheck ? inputName : null}
        {NameCheck ? inputPassword : null}
        {PasswordCheck ? register : null}
      </form>
    </div>
  );
}

export default RegisterPage;
