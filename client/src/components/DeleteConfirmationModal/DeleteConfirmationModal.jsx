import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import TriggerSuccessModalContext from '../../contexts/TriggerSuccessModal';
import './DeleteConfirmationModal.scss';

const DeleteConfirmationModal = ({ toggleDeleteConfirmationModal }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);
  const { triggerSuccessModal } = useContext(TriggerSuccessModalContext);

  const handleDeleteCollection = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchUserData = await fetch(`/api/user/${user.data.user.email}`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const collectionIndex = data.collections.findIndex(
      (entry) => entry.collectionName === params.id
    );

    if (collectionIndex !== -1) {
      data.collections.splice(collectionIndex, 1);
    }

    await fetch(`/api/user/${user.data.user.email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText(
      <p>
        Collection <span style={{ fontWeight: 700 }}>{params.id}</span>{' '}
        successfully deleted!
      </p>
    );
    navigate('/collections');
    triggerSuccessModal();
  };

  return (
    <div className="DeleteConfirmationModal">
      <div className="confirmation-content">
        <p>Are you sure you want to delete {params.id}?</p>
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteCollection();
          }}
        >
          Delete collection
        </button>
        <button
          className="Button"
          onClick={() => {
            toggleDeleteConfirmationModal();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
