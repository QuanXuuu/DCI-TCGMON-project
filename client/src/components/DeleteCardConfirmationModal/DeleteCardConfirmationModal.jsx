import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import './DeleteCardConfirmationModal.scss';

const DeleteCardConfirmationModal = ({
  scrollY,
  content,
  singleCardData,
  toggleDeleteCardConfirmationModal,
  toggleEditSingleCardModal,
  toggleSuccessModal,
}) => {
  const params = useParams();

  const { user } = useAuthContext();
  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);

  const handleDeleteCard = async () => {
    const fetchUserData = await fetch(`/api/user/${user.data.user.email}`, {
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

    await fetch(`/api/user/${user.data.user.email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText(
      <p>
        <span style={{ fontWeight: 700 }}>
          {singleCardData.name} ({singleCardData.set.name})
        </span>{' '}
        successfully removed from collection{' '}
        <span style={{ fontWeight: 700 }}>{params.id}</span>!
      </p>
    );
    toggleDeleteCardConfirmationModal();
    toggleEditSingleCardModal();
    toggleSuccessModal();
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
