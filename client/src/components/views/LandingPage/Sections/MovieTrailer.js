import React from 'react';
import {Row, Col} from 'antd';

function MovieTrailer() {
  return (
    <div className="trailerContent">
      <h1>인기 트레일러</h1>
      <Row>
        <Col lg={18} xs={24}>
          <div>
            <h3>title</h3>
            {/* <video /> */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/-ezfi6FQ8Ds"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Col>
        <Col lg={6} xs={24}></Col>
      </Row>
    </div>
  );
}

export default MovieTrailer;
