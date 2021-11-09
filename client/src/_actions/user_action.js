import axios from 'axios';
import {LOGIN_USER, REGIST_USER, AUTH_USER, KAKAO_USER} from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataSubmit) {
  const request = axios
    .post('/api/users/register', dataSubmit)
    .then((response) => response.data);

  return {
    type: REGIST_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function checkUser(dataSubmit) {
  const request = axios
    .post('/api/users/checkuser', dataSubmit)
    .then((response) => response.data);

  return {
    type: KAKAO_USER,
    payload: request,
  };
}
