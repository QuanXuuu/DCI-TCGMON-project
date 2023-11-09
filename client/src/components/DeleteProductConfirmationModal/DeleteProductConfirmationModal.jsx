import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import TriggerSuccessModalContext from '../../contexts/TriggerSuccessModal';
import './DeleteProductConfirmationModal.scss';

const DeleteProductConfirmationModal = ({
  scrollY,
  content,
  sealedProductData,
  toggleDeleteProductConfirmationModal,
  toggleEditSealedProductModal,
}) => {
  const params = useParams();

  const { setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);
  const { triggerSuccessModal } = useContext(TriggerSuccessModalContext);

  const handleDeleteProduct = async () => {
    const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const collectionIndex = data.collections.findIndex(
      (entry) => entry.collectionName.toLowerCase() === params.id.toLowerCase()
    );

    const entryIndex = data.collections[
      collectionIndex
    ].collectionContent.sealedProducts.findIndex(
      (entry) => entry.entryId === content.entryId
    );

    data.collections[collectionIndex].collectionContent.sealedProducts.splice(
      entryIndex,
      1
    );

    await fetch(`/api/users/bob@bob.de`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText(
      `${sealedProductData.name} (${sealedProductData.set.name}) successfully removed from collection ${params.id}!`
    );
    toggleDeleteProductConfirmationModal;
    toggleEditSealedProductModal();
    triggerSuccessModal();
  };

  return (
    <div className="DeleteProductConfirmationModal" style={{ top: scrollY }}>
      <div className="dpcm-confirmation-content">
        <p>Are you sure you want to delete {sealedProductData.name}?</p>
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteProduct();
          }}
        >
          Delete Product
        </button>
        <button
          className="Button"
          onClick={() => {
            toggleDeleteProductConfirmationModal();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProductConfirmationModal;
