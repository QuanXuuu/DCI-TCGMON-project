import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import TriggerSuccessModalContext from '../../contexts/TriggerSuccessModal';
import './DeleteCardConfirmationModal.scss';

const DeleteCardConfirmationModal = ({
  scrollY,
  content,
  singleCardData,
  toggleDeleteCardConfirmationModal,
  toggleEditSingleCardModal,
}) => {
  const params = useParams();

  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);
  const { triggerSuccessModal } = useContext(TriggerSuccessModalContext);

  const handleDeleteCard = async () => {
    const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const collectionIndex = data.collections.findIndex(
      (entry) => entry.collectionName.toLowerCase() === params.id.toLowerCase()
    );

    const entryIndex = data.collections[
      collectionIndex
    ].collectionContent.singleCards.findIndex(
      (entry) => entry.entryId === content.entryId
    );

    data.collections[collectionIndex].collectionContent.singleCards.splice(
      entryIndex,
      1
    );

    await fetch(`/api/users/bob@bob.de`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText(
      `${singleCardData.name} (${singleCardData.set.name}) successfully removed from collection ${params.id}!`
    );
    toggleDeleteCardConfirmationModal;
    toggleEditSingleCardModal();
    triggerSuccessModal();
  };

  return (
    <div className="DeleteCardConfirmationModal" style={{ top: scrollY }}>
      <div className="dccm-confirmation-content">
        <p>Are you sure you want to delete {singleCardData.name}?</p>
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteCard();
          }}
        >
          Delete Card
        </button>
        <button
          className="Button"
          onClick={() => {
            toggleDeleteCardConfirmationModal();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCardConfirmationModal;