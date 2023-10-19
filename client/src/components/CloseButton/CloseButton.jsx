import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import './CloseButton.scss';

const CloseButton = ({ toggleMenu }) => {
  return (
    <div className="CloseButton">
      <button onClick={toggleMenu} className="close-button">
        <FontAwesomeIcon icon={faTimesCircle} className="close-icon" />
      </button>
    </div>
  );
};

export default CloseButton;
