import React, {useState} from 'react';
import {FaTimes, FaAngleDown, FaAngleUp} from 'react-icons/fa';

function Modal({modalCLose, trailerKey, movie}) {
  const [Isclamp, setIsClamp] = useState(false);

  const onChangeClamp = () => {
    setIsClamp(!Isclamp);
  };

  return (
    <div className="trailer_modal_contaier">
      <div className="trailer_modal">
        <h1>[{movie.title}] 예고편</h1>
        <FaTimes className="modal_close_btn" onClick={modalCLose} />
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1 `}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <p className={Isclamp ? 'modal_overview' : 'modal_overview clamp'}>
          {movie.overview}
        </p>
        {Isclamp ? (
          <FaAngleUp className="clamp-icon" onClick={onChangeClamp} />
        ) : (
          <FaAngleDown className="clamp-icon" onClick={onChangeClamp} />
        )}
      </div>
    </div>
  );
}

export default Modal;
