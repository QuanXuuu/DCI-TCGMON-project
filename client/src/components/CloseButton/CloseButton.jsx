import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './CloseButton.scss';

const CloseButton = ({ toggleMenu, toggleAddCollectionModal, toggleEditCollectionModal, toggleAddSingleCardModal, toggleAddSealedProductModal, toggleEditSingleCardModal }) => {

  const closeOptions = () => {
    if (toggleAddCollectionModal) {
      toggleAddCollectionModal();

    } else if (toggleMenu) {
      toggleMenu();

    } else if (toggleEditCollectionModal) {
      toggleEditCollectionModal();
    
    } else if (toggleAddSingleCardModal) {
      toggleAddSingleCardModal();

    } else if (toggleAddSealedProductModal) {
      toggleAddSealedProductModal();

    }else if (toggleEditSingleCardModal) {
      toggleEditSingleCardModal();
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

