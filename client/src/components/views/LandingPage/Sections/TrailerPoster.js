import React from 'react';
import {IMAGE_BASE_URL} from './../../../Config';
import {BsPlayCircle} from 'react-icons/bs';

function TrailerPoster({poster, posterTitle}) {
  return (
    <div className="trailer-poster">
      <img src={`${IMAGE_BASE_URL}w154${poster}`} />
      <div className="trailer-title">
        <BsPlayCircle className="play-icon" />
        <span>"{posterTitle}"</span>
      </div>
    </div>
  );
}

export default TrailerPoster;
