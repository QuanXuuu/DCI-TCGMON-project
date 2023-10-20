import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import './CloseButton.scss';

const CloseButton = ({ toggleMenu, toggleAddCollectionModal }) => {

  const closeOptions = () => {
    if (toggleAddCollectionModal) {
      toggleAddCollectionModal();

    } else if (toggleMenu) {
      toggleMenu();
    }
  };

  return (
    <div className="CloseButton">
      <button onClick={closeOptions} className="close-button">
        <FontAwesomeIcon icon={faTimesCircle} className="close-icon" />
      </button>
    </div>
  );
};

export default CloseButton;
