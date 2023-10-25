import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
// import { useParams } from 'react-router-dom';
import CloseButton from '../CloseButton/CloseButton';
import './AddCollectionModal.scss';

const AddCollectionModal = ({
  isAddCollectionModalOpen,
  toggleAddCollectionModal,
}) => {
  const { setUserData } = useContext(UserDataContext);
  // const { params } = useParams();

  const [collectionName, setCollectionName] = useState('');
  const [collectionTCG, setCollectionTCG] = useState('');

  const handleCreateCollection = async () => {
    const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    data.collections.unshift({
      collectionName: collectionName,
      collectionTCG: collectionTCG,
      collectionContent: {
        singleCards: [],
        sealedProducts: [],
      },
    });

    const updateUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const response = await updateUserData.json();
    setUserData(data);
  };

  return (
    <div className="AddCollectionModal">
      <div className="close">
        <CloseButton
          isAddCollectionModalOpen={isAddCollectionModalOpen}
          toggleAddCollectionModal={toggleAddCollectionModal}
        />
      </div>
      <div className="AddCollectionModalContent">
        <p>Create New Collection</p>
        <input
          id="collectionName"
          type="text"
          placeholder="Collection Name"
          onChange={(e) => {
            setCollectionName(e.target.value);
          }}
        />
        <select
          id="collectionTCG"
          onChange={(e) => {
            setCollectionTCG(e.target.value);
          }}
        >
          <option value="">-- Choose TCG --</option>
          <option value="pokemon">Pokemon</option>
        </select>
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
