import React, {useState} from 'react';
import {message} from 'antd';
import './RegisterPage.scss';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [EmailCheck, setEmailCheck] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [PasswordCheck, setPasswordCheck] = useState(false);
  const [IsPassVisible, setIsPassVisible] = useState(false);

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
    const emailRule =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (Email === '') {
      message.warn('이메일을 다시 한번 확인해주세요.');
    } else {
      if (!emailRule.test(Email)) {
        message.warn('올바른 이메일 형식이 아닙니다.');
      } else {
        axios.post('/api/users/checkuser', {email: Email}).then((response) => {
          if (response.data.userData) {
            message.warn('이미 등록된 이메일입니다.');
          } else {
            message.success('사용 가능한 이메일입니다.');
            setTimeout(() => {
              const check = window.confirm('해당 이메일로 가입하시겠습니까?');
              if (check) {
                setEmailCheck(true);
              }
            }, 1000);
          }
        });
      }
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
    const passRule =
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (Password === '') {
      message.warn('비밀번호를 다시 한번 확인해주세요.');
    } else {
      if (!passRule.test(Password)) {
        message.warn(
          '비밀번호는 숫자와 문자 그리고 특수문자를 포함하여 8~15자리 이내로 입력해주세요.'
        );
      } else {
        const check = window.confirm(
          `사용할 비밀번호는 ${Password}이(가) 맞습니까?`
        );
        if (check) {
          setPasswordCheck(true);
        }
      }
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

    dispatch(registerUser(variables)).then((response) => {
      if (response.payload.success) {
        message.success('회원가입이 완료되었습니다.');

        setTimeout(() => {
          props.history.push('/login');
        }, 1000);
      } else {
        message.error('회원가입에 실패하셨습니다.');
      }
    });
  };

  const onClickEye = () => {
    setIsPassVisible(!IsPassVisible);
  };

  const inputName = (
    <>
      <div>
        <label>사용자 이름을 입력해주세요.</label>
      </div>
      <div>
        <label>→</label>
        <input type="text" value={Name} onChange={onNameHandler} />
      </div>
      {NameCheck ? null : (
        <button type="button" onClick={onNameCheck}>
          다음
        </button>
      )}
    </>
  );

  const inputPassword = (
    <>
      <div>
        <label>비밀번호를 입력해주세요.</label>
      </div>
      <div>
        <label>→</label>
        <input
          type={IsPassVisible ? 'text' : 'password'}
          value={Password}
          onChange={onPasswordHandler}
        />
        {IsPassVisible ? (
          <FaEye className="eye-icon" onClick={onClickEye} />
        ) : (
          <FaEyeSlash className="eye-icon" onClick={onClickEye} />
        )}
      </div>
      {PasswordCheck ? null : (
        <button type="button" onClick={onPasswordCheck}>
          다음
        </button>
      )}
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
      <div className="register-container">
        <h1 className="registerTitle" style={{color: 'white'}}>
          <span>WATCHED</span>에 가입하고 영화를 평가해 보세요.
        </h1>
        <br />
        <p className="registerSubtitle">Welcome to WATCHED!</p>
        <form onSubmit={onSubmitForm}>
          <ul>
            <li>
              <div>
                <label>이메일을 입력해주세요.</label>
              </div>
              <div>
                <label>→</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
              </div>
              {EmailCheck ? null : (
                <button type="button" onClick={onEmailCheck}>
                  다음
                </button>
              )}
            </li>
            <li>{EmailCheck ? inputName : null}</li>
            <li>{NameCheck ? inputPassword : null}</li>
            <li>{PasswordCheck ? register : null}</li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
