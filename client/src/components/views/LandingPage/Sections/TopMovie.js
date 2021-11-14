import React from 'react';
import '../LandingPage.scss';

function TopMovie() {
  return (
    <div className="topMovieContent">
      <h1 className="category">
        <div className="ColBar"></div>TOP 10
      </h1>
      <p className="subCategory">현재 1위 ~ 10위까지의 영화는?</p>
    </div>
  );
}

export default TopMovie;
