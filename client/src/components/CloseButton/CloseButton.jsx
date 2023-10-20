import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
        <FontAwesomeIcon icon={faXmark} className="close-icon" />
      </button>
    </div>
  );
};

export default CloseButton;
