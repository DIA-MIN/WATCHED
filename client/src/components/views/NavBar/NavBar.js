import React, {useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import './NavBar.scss';
import RightMenu from './Sections/RightMenu';

function NavBar(props) {
  const [Clicked, setClicked] = useState(false);

  const onClickHandle = () => {
    setClicked(!Clicked);
  };

  return (
    <nav className="navContainer">
      <div className="logo">
        <a href="/">WATCHED</a>
      </div>

      <RightMenu isClicked={Clicked} />

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

export default NavBar;
