import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import TriggerSuccessModalContext from '../../contexts/TriggerSuccessModal';
import '../DeleteConfirmationModal/DeleteConfirmationModal.scss';

const DeleteCardConfirmationModal = ({ toggleDeleteCardConfirmationModal, isDeleteCardConfirmationModalOpen }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);
  const { triggerSuccessModal } = useContext(TriggerSuccessModalContext);

/*   const handleDeleteCollection = async () => {
    const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const collectionIndex = data.collections.findIndex(
      (entry) => entry.collectionName === params.id
    );

    if (collectionIndex !== -1) {
      data.collections.splice(collectionIndex, 1);
    }

    await fetch(`/api/users/bob@bob.de`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText(`Collection ${params.id} successfully deleted!`);
    navigate('/collections');
    triggerSuccessModal();
  }; */

  return (
      <div className="DeleteCardConfirmationModal"
      /* style={{ overflowY: isDeleteCardConfirmationModalOpen ? 'scroll' : 'hidden' }} */>
      <div className="dccm-confirmation-content">
        <p>Are you sure you want to delete?</p>
        <button
          className="delete-button"
          /* onClick={() => {
            handleDeleteCollection();
          }} */
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
