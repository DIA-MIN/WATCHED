import React from 'react';
import Axios from 'axios';

function LandingPage() {
  const onClickLogout = () => {
    Axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('로그아웃 실패!');
      }
    });
  };

  return (
    <div>
      LandingPage
      <button style={{border: '1px solid black'}} onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
}

export default LandingPage;
