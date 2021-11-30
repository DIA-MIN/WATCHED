import React, {useEffect, useState} from 'react';
import {FaHeart} from 'react-icons/fa';
import axios from 'axios';
import {message} from 'antd';

function TopMoviePick({movieId, movieRate, moviePoster, movieTitle}) {
  const userId = localStorage.getItem('user_id');
  const [IsFavorite, setIsFavorite] = useState(false);

  const variables = {
    userId,
    movieId,
    movieRate,
    moviePoster,
    movieTitle,
  };

  useEffect(() => {
    if (userId) {
      axios.post('/api/favorite/checkPick', variables).then((response) => {
        if (response.data.success) {
          setIsFavorite(response.data.isFavorite);
        } else {
          alert('My Pick Check Fail...');
        }
      });
    }
  }, []);

  const onClickMyPick = () => {
    if (userId) {
      if (IsFavorite) {
        axios.post('/api/favorite/unPickMovie', variables).then((response) => {
          if (response.data.pickDeleteSuccess) {
            setIsFavorite(!IsFavorite);
            message.success('My Pick 리스트에서 제거되었습니다.');
          } else {
            alert('My Pick 취소에 실패하셨습니다.');
          }
        });
      } else {
        axios.post('/api/favorite/pickMovie', variables).then((response) => {
          if (response.data.pickSuccess) {
            setIsFavorite(!IsFavorite);
            message.success('My Pick 리스트에 추가되었습니다.');
          } else {
            alert('My Pick 등록에 실패하셨습니다.');
          }
        });
      }
    } else {
      message.warn('로그인 후 이용 가능합니다.');
      setIsFavorite(false);
    }
  };

  return (
    <>
      <FaHeart
        className={IsFavorite ? 'add-myPick-icon clamp' : 'add-myPick-icon'}
        onClick={onClickMyPick}
      />
    </>
  );
}

export default TopMoviePick;
