import React, {useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import './NavBar.scss';
import RightMenu from './Sections/RightMenu';
import {withRouter} from 'react-router-dom';

function NavBar(props) {
  const [Clicked, setClicked] = useState(false);

  const onClickHandle = () => {
    setClicked(!Clicked);
  };

  return (
    <nav className="navContainer">
      <div className="logo" onClick={() => props.history.push('/')}>
        WATCHED
      </div>

      <RightMenu isClicked={Clicked} setClicked={setClicked} />

      <div className="menu" onClick={onClickHandle}>
        {Clicked ? (
          <FaTimes className="toggle-icon" />
        ) : (
          <FaBars className="toggle-icon" />
        )}
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
