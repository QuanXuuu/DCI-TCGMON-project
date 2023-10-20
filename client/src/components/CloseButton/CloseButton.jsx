import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './CloseButton.scss';

const CloseButton = ({ toggleMenu }) => {
  return (
    <div className="CloseButton">
      <button onClick={toggleMenu} className="close-button">
        <FontAwesomeIcon icon={faXmark} className="close-icon" />
      </button>
    </div>
  );
};

export default CloseButton;
