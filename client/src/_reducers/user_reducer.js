import {
  LOGIN_USER,
  REGIST_USER,
  AUTH_USER,
  KAKAO_LOGIN_USER,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload};

    case REGIST_USER:
      return {...state, registSuccess: action.payload};

    case AUTH_USER:
      return {...state, userData: action.payload};

    case KAKAO_LOGIN_USER:
      return {...state, loginSuccess: action.payload};

    default:
      return state;
  }
}
