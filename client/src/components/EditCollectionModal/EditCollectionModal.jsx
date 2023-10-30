import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import CloseButton from '../CloseButton/CloseButton';
import './EditCollectionModal.scss';

const EditCollectionModal = ({
  isEditCollectionModalOpen,
  toggleEditCollectionModal,
  collectionData,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext);

  const [collectionName, setCollectionName] = useState(params.id);
  const [collectionTCG, setCollectionTCG] = useState('');

  useEffect(() => {
    setCollectionName(collectionData.collectionName);
    setCollectionTCG(collectionData.collectionTCG);
  }, []);

  //   const handleUpdateCollection = async () => {
  //     const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
  //       method: 'GET',
  //     });
  //     const data = await fetchUserData.json();

  //     const collectionIndex = data.collections.findIndex(
  //       (entry) => entry.collectionName === params.id);

  //     if (collectionIndex !== -1) {
  //       data.collections.splice(collectionIndex, 1);
  //     }

  //     data.collections.unshift({
  //       collectionName: collectionName,
  //       collectionTCG: collectionTCG,
  //       collectionContent: {
  //         singleCards: [],
  //         sealedProducts: [],
  //       },
  //     });

  //     const updateUserData = await fetch(`/api/users/bob@bob.de`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });
  //     const response = await updateUserData.json();
  //     setUserData(data);
  //   };

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

    const updateUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const response = await updateUserData.json();
    setUserData(data);
  };

  return (
    <div className="EditCollectionModal">
      <div className="close-button-wrapper">
        <CloseButton
          isEditCollectionModalOpen={isEditCollectionModalOpen}
          toggleEditCollectionModal={toggleEditCollectionModal}
        />
      </div>
      <div className="EditCollectionModalContent">
        <p>Edit collection</p>
        <input
          className="CollectionNameInput"
          type="text"
          placeholder="Collection name"
          value={collectionName}
          onChange={(e) => {
            setCollectionName(e.target.value);
          }}
        />
        <div className="select-wrapper">
          <select
            name="TCGs"
            id="TCGname"
            value={collectionTCG}
            onChange={(e) => {
              setCollectionTCG(e.target.value);
            }}
          >
            <option value="pokemon">Pokemon</option>
          </select>
        </div>

        <button
          className="Button"
          onClick={() => {
            //handleUpdateCollection();
            //toggleEditCollectionModal();
          }}
        >
          Update collection
        </button>
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteCollection();
            navigate('/collections');
          }}
        >
          Delete collection
        </button>
      </div>
    </div>
  );
};

export default EditCollectionModal;
