import { useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import AddCollectionButton from '../AddCollectionButton/AddCollectionButton';
import './EditCollectionModal.scss';

const EditCollectionModal = ({
  isEditCollectionModalOpen,
  toggleEditCollectionModal,
}) => {

  const [collectionName, setCollectionName] = useState('');
  const [collectionTCG, setCollectionTCG] = useState('');

  return (
    <div className="EditCollectionModal">
      <div className="close">
        <CloseButton
          isEditCollectionModalOpen={isEditCollectionModalOpen}
          toggleEditCollectionModal={toggleEditCollectionModal}
        />
      </div>
      <div className="EditCollectionModalContent">
        <p>Edit Collection</p>
        <input
          className="CollectionNameInput"
          type="text"
          placeholder="Collection Name"
          onChange={(e) => {
            setCollectionName(e.target.value);
          }}
        />
        <select
          name="TCGs"
          id="TCGname"
          onChange={(e) => {
            setCollectionTCG(e.target.value);
          }}
        >
          <option value="">Pokemon</option>
        </select>

        <AddCollectionButton text={'Update collection'} />
      </div>
      <div className="Delete-Div">
        <button
          className="Delete-Button">Delete collection
        </button>
      </div>
    </div>
  );
};

export default EditCollectionModal;
