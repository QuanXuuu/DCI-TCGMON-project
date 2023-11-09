import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import CloseButton from '../CloseButton/CloseButton';
import './AddCollectionModal.scss';

const AddCollectionModal = ({
  isAddCollectionModalOpen,
  toggleAddCollectionModal,
}) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [collectionName, setCollectionName] = useState('');
  const [collectionTCG, setCollectionTCG] = useState('');

  const { user } = useAuthContext();
  const userLoggedIn = user.data.user;

  const handleCreateCollection = async () => {
    const fetchUserData = await fetch(`/api/users/${userLoggedIn.email}`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const duplicateIndex = data.collections.findIndex(
      (entry) =>
        entry.collectionName.toLowerCase() === collectionName.toLowerCase()
    );

    if (duplicateIndex === -1) {
      data.collections.unshift({
        collectionName: collectionName,
        collectionTCG: collectionTCG,
        collectionContent: {
          singleCards: [],
          sealedProducts: [],
        },
      });

      await fetch(`/api/users/${userLoggedIn.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setUserData(data);
      console.log('updatedAddModal', userData);
    } else console.log('Error: Duplicate detected, need error modal popup');
  };

  return (
    <div className="AddCollectionModal">
      <div className="close-button-wrapper">
        <CloseButton
          isAddCollectionModalOpen={isAddCollectionModalOpen}
          toggleAddCollectionModal={toggleAddCollectionModal}
        />
      </div>
      <div className="AddCollectionModalContent">
        <p>Create new collection</p>
        <input
          id="collectionName"
          type="text"
          placeholder="Collection name"
          onChange={(e) => {
            setCollectionName(e.target.value);
          }}
        />
        <div className="select-wrapper">
          <select
            id="collectionTCG"
            onChange={(e) => {
              setCollectionTCG(e.target.value);
            }}
          >
            <option value="">-- Choose TCG --</option>
            <option value="pokemon">Pokemon</option>
          </select>
        </div>
        <button
          className="Button"
          onClick={() => {
            handleCreateCollection();
            toggleAddCollectionModal();
          }}
        >
          Create new collection
        </button>
      </div>
    </div>
  );
};

export default AddCollectionModal;
