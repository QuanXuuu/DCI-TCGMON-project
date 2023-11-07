import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import './DeleteConfirmationModal.scss';

const DeleteConfirmationModal = ({
  toggleDeleteConfirmationModal,
  collectionData,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext);

  const handleDeleteCollection = async () => {
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
    navigate('/collections');
  };

  return (
    <div className="DeleteConfirmationModal">
      <div className='confirmation-content'>
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
