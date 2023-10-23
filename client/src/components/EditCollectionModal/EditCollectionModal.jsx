import CloseButton from '../CloseButton/CloseButton';
import AddCollectionButton from '../AddCollectionButton/AddCollectionButton';
import './EditCollectionModal.scss';

const EditCollectionModal = ({
  isEditCollectionModalOpen,
  toggleEditCollectionModal,
}) => {
  return (
    <div className="EditCollectionModal">
      <div className="close">
        <CloseButton
          isEditCollectionModalOpen={isEditCollectionModalOpen}
          toggleAddCollectionModal={toggleEditCollectionModal}
        />
      </div>
      <div className="EditCollectionModalContent">
        <p>Edit Collection</p>
        <input
          className="CollectionNameInput"
          type="text"
          placeholder="Collection Name"
        />
        <select name="TCGs" id="TCGname">
          <option value="">Pokemon</option>
        </select>
        <AddCollectionButton text={'Create new collection'} />
      </div>

      <button className="Delete-Button">Delete collection</button>
    </div>
  );
};

export default EditCollectionModal;
