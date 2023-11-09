import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import CloseButton from '../CloseButton/CloseButton';
import './AddCollectionModal.scss';

const AddCollectionModal = ({
  isAddCollectionModalOpen,
  toggleAddCollectionModal,
  toggleSuccessModal,
}) => {

  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);

  const [collectionName, setCollectionName] = useState('');
  const [collectionTCG, setCollectionTCG] = useState('');

  const handleCreateCollection = async () => {
    const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const duplicateIndex = data.collections.findIndex(
      (entry) =>
        entry.collectionName.toLowerCase() === collectionName.toLowerCase()
    );

    if (duplicateIndex === -1) {
      data.collections.unshift({
        collectionName:
          collectionName === ''
            ? `Collection ${Math.floor(Math.random() * 998) + 1}`
            : collectionName,
        collectionTCG: collectionTCG === '' ? 'pokemon' : collectionTCG,
        collectionContent: {
          singleCards: [],
          sealedProducts: [],
        },
      });

      await fetch(`/api/users/bob@bob.de`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setUserData(data);
      setSuccessModalText('New collection successfully created!');
      toggleAddCollectionModal();
      toggleSuccessModal();
    } else {
      console.log('Duplicate name detected');
      return;
    }
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
          value={collectionName}
          onChange={(e) => {
            const regex = /^[a-zA-Z0-9]*( [a-zA-Z0-9]+)* ?$/;
            if (regex.test(e.target.value)) {
              setCollectionName(e.target.value);
            }
          }}
          onBlur={(e) => {
            let newValue = e.target.value.trim();
            setCollectionName(newValue);
          }}
        />
        <div className="select-wrapper">
          <select
            id="collectionTCG"
            value={collectionTCG}
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
          }}
        >
          Create new collection
        </button>
      </div>
    </div>
  );
};

export default AddCollectionModal;
