import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import CloseButton from '../CloseButton/CloseButton';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import './EditCollectionModal.scss';

const EditCollectionModal = ({
  isEditCollectionModalOpen,
  toggleEditCollectionModal,
  collectionData,
  toggleSuccessModal,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);

  const [collectionName, setCollectionName] = useState(params.id);
  const [collectionTCG, setCollectionTCG] = useState(
    collectionData.collectionTCG
  );
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
    const [scrollY, setScrollY] = useState(0);

  const toggleDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(!isDeleteConfirmationModalOpen);
  };

  const handleUpdateCollection = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchUserData = await fetch(`/api/user/${user.data.user.email}`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const initialCollectionIndex = data.collections.findIndex(
      (entry) => entry.collectionName.toLowerCase() === params.id.toLowerCase()
    );
    const newCollectionIndex = data.collections.findIndex(
      (entry) =>
        entry.collectionName.toLowerCase() === collectionName.toLowerCase()
    );

    if (initialCollectionIndex === newCollectionIndex) {
      data.collections[initialCollectionIndex].collectionName = collectionName;
      data.collections[initialCollectionIndex].collectionTCG = collectionTCG;
    } else if (newCollectionIndex !== -1) {
      console.log('Duplicate name detected');
      return;
    } else {
      data.collections[initialCollectionIndex].collectionName = collectionName;
      data.collections[initialCollectionIndex].collectionTCG = collectionTCG;
    }

    await fetch(`/api/user/${user.data.user.email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText('Collection name successfully updated!');
    navigate(`/collections/${collectionName}`);
    toggleEditCollectionModal();
    toggleSuccessModal();
  };

  const handleScrollCalculation = () => {

    let userAgentString =  
    navigator.userAgent; 

    let chromeAgent =  
      userAgentString.indexOf("Chrome") > -1
    
      let safariAgent =  
      userAgentString.indexOf("Safari") > -1; 

      if ((chromeAgent) && (safariAgent))  
      safariAgent = false; 

      if (safariAgent) {
      toggleDeleteConfirmationModal();
      }
    
      else {
      const scrollValue = Math.round(
        document.querySelector('.EditCollectionModal').scrollTop
      );
      setScrollY(scrollValue);
      toggleDeleteConfirmationModal();
      };
  }

  return (
    <div
      className="EditCollectionModal"
      style={
        { overflowY: isEditCollectionModalOpen ? 'scroll' : 'hidden' } && {
          overflowY: isDeleteConfirmationModalOpen ? 'hidden' : 'scroll',
        }
      }>
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
            handleUpdateCollection();
          }}
        >
          Update collection
        </button>
        <button
          className="delete-button"
          onClick={() => {
            handleScrollCalculation();
          }}
        >
          Delete collection
        </button>
      </div>
      {isDeleteConfirmationModalOpen ? (
        <DeleteConfirmationModal
          toggleDeleteConfirmationModal={toggleDeleteConfirmationModal}
          scrollY={scrollY}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditCollectionModal;
