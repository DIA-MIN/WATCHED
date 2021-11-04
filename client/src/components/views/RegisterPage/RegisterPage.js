import React, {useState} from 'react';
import {Button, message} from 'antd';
import './RegisterPage.scss';
import Axios from 'axios';
import moment from 'moment';

function RegisterPage(props) {
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
    if (Email === '') {
      message.warn('이메일을 다시 한번 확인해주세요.');
    } else {
      setEmailCheck(true);
    }
  };

  const onNameCheck = () => {
    if (Name === '') {
      message.warn('이름을 다시 한번 확인해주세요.');
    } else {
      setNameCheck(true);
    }
  };

  const onPasswordCheck = () => {
    if (Password === '') {
      message.warn('비밀번호를 다시 한번 확인해주세요.');
    } else {
      setPasswordCheck(true);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const variables = {
      email: Email,
      name: Name,
      password: Password,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
    };

    Axios.post('/api/users/register', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        // props.history.push('/login');
      } else {
        alert('회원가입에 실패하셨습니다.');
      }
    });
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
      <button className="registerBtn" onClick={onSubmitForm}>
        Let's go WATCHED
      </button>
    </>
  );

  return (
    <div className="registerContent">
      <h1 className="registerTitle" style={{color: 'white'}}>
        <span>WATCHED</span>에 가입하고 영화를 평가해 보세요.
      </h1>
      <br />
      <p className="registerSubtitle">Welcome to WATCHED!</p>
      <form onSubmit={onSubmitForm}>
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
