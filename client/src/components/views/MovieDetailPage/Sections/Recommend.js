import React, {useState, useEffect} from 'react';
import {FaThumbsUp} from 'react-icons/fa';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {message} from 'antd';

function Recommend({reviewId}) {
  const user = useSelector((state) => state.user);
  const [Recommend, setRecommend] = useState(0);
  const [IsRecommend, setIsRecommend] = useState(false);

  const variables = {
    userId: user.userData._id,
    reviewId: reviewId,
  };

  useEffect(() => {
    axios.post('/api/recommend/getRecommend', variables).then((response) => {
      if (response.data.getRecommendSuccess) {
        setRecommend(response.data.recommend.length);

        response.data.recommend.map((recommend) => {
          if (recommend.userId === user.userData._id) {
            setIsRecommend(!IsRecommend);
          }
        });
      } else {
        alert('감상평 추천 수 불러오기에 실패했습니다.');
      }
    });
  }, []);

  const onClickRecommend = () => {
    if (user.userData.isAuth) {
      if (IsRecommend) {
        axios.post('/api/recommend/unRecommend', variables).then((response) => {
          if (response.data.deleteSuccess) {
            setRecommend(Recommend - 1);
            setIsRecommend(!IsRecommend);
          } else {
            alert('해당 감상평 추천 취소에 실패하셨습니다.');
          }
        });
      } else {
        axios.post('/api/recommend/onRecommend', variables).then((response) => {
          if (response.data.success) {
            setRecommend(Recommend + 1);
            setIsRecommend(!IsRecommend);
          } else {
            alert('해당 감상평 추천에 실패하셨습니다.');
          }
        });
      }
    } else {
      message.warn('해당 기능은 로그인 이후에 이용 가능합니다.');
    }
  };

  return (
    <div className="recommend-btn">
      <div
        onClick={onClickRecommend}
        className={IsRecommend ? 'recommend clamp' : 'recommend'}
      >
        <FaThumbsUp className="recommend-icon" />
        <span>{Recommend}</span>
      </div>
    </div>
  );
}

export default Recommend;
