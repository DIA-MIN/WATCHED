import React from 'react';
import {FaTimes} from 'react-icons/fa';

function Modal({modalCLose, trailerKey, movie}) {
  return (
    <div className="trailer_modal_contaier">
      <div className="trailer_modal">
        <h1>[{movie.title}] 예고편</h1>
        <FaTimes className="modal_close_btn" onClick={modalCLose} />
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default Modal;
