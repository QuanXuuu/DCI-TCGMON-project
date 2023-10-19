import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Hamburger.scss';

const Hamburger = ({ color, toggleMenu }) => {

  return (
    <div className="Hamburger">
      <button onClick={toggleMenu} className="hamburger-button">
        <FontAwesomeIcon icon={faBars} className="hamburger-icon" style={color === 'black' ? { color: 'rgba(0, 0, 0, 0.85)' } : ''}/>
      </button>
    </div>
  );
};

export default Hamburger;
