import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import CloseButton from '../CloseButton/CloseButton';
import DeleteProductConfirmationModal from '../DeleteProductConfirmationModal/DeleteProductConfirmationModal';
import './EditSealedProductModal.scss';

const EditSealedProductModal = ({
  isEditSealedProductModalOpen,
  toggleEditSealedProductModal,
  content,
  sealedProductData,
  toggleSuccessModal,
}) => {
  const params = useParams();

  const { user } = useAuthContext();
  const { userData, setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);

  const [firstEdition, setFirstEdition] = useState(content.firstEdition);
  const [language, setLanguage] = useState(content.language);
  const [purchasePrice, setPurchasePrice] = useState(
    content.purchasePrice.toFixed(2)
  );
  const [amount, setAmount] = useState(content.amount);
  const [collection, setCollection] = useState(params.id);
  const [initialCollection] = useState(params.id);
  const [scrollY, setScrollY] = useState(0);

  const [
    isDeleteProductConfirmationModalOpen,
    setIsDeleteProductConfirmationModalOpen,
  ] = useState(false);

  const toggleDeleteProductConfirmationModal = () => {
    setIsDeleteProductConfirmationModalOpen(
      !isDeleteProductConfirmationModalOpen
    );
  };

  const handleUpdateProduct = async () => {
    const updatedSealedProduct = {
      entryId: content.entryId,
      id: content.id,
      firstEdition: firstEdition,
      language: language,
      purchasePrice: Number(purchasePrice),
      amount: Number(amount),
    };

    const selectedCollection = collection;

    const fetchUserData = await fetch(`/api/user/${user.data.user.email}`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const initialCollectionIndex = data.collections.findIndex(
      (entry) =>
        entry.collectionName.toLowerCase() === initialCollection.toLowerCase()
    );

    const entryIndex = data.collections[
      initialCollectionIndex
    ].collectionContent.sealedProducts.findIndex(
      (entry) => entry.entryId === content.entryId
    );

    if (selectedCollection.toLowerCase() !== initialCollection.toLowerCase()) {
      const newCollectionIndex = data.collections.findIndex(
        (entry) =>
          entry.collectionName.toLowerCase() ===
          selectedCollection.toLowerCase()
      );

      data.collections[
        initialCollectionIndex
      ].collectionContent.sealedProducts.splice(entryIndex, 1);

      data.collections[
        newCollectionIndex
      ].collectionContent.sealedProducts.push(updatedSealedProduct);
    } else {
      data.collections[initialCollectionIndex].collectionContent.sealedProducts[
        entryIndex
      ] = updatedSealedProduct;
    }

    await fetch(`/api/user/${user.data.user.email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
    setSuccessModalText(`${sealedProductData.name} successfully updated!`);
    toggleEditSealedProductModal();
    toggleSuccessModal();
  };

  const handleScrollCalculation = () => {
    const scrollValue = Math.round(
      document.querySelector('.EditSealedProductModal').scrollTop
    );
    setScrollY(scrollValue);
  };

  return (
    <div
      className="EditSealedProductModal"
      style={
        { overflowY: isEditSealedProductModalOpen ? 'scroll' : 'hidden' } && {
          overflowY: isDeleteProductConfirmationModalOpen ? 'hidden' : 'scroll',
        }
      }
    >
      <div className="espm-wrapper">
        <div className="close-button-wrapper">
          <CloseButton
            isEditSealedProductModalOpen={isEditSealedProductModalOpen}
            toggleEditSealedProductModal={toggleEditSealedProductModal}
          />
        </div>

        <div className="content">
          <p className="title">{sealedProductData.name}</p>
          <div className="img-and-info-wrapper">
            <div className="img-wrapper-sealed">
              <img
                src={sealedProductData.images.small}
                alt={sealedProductData.id}
              />
            </div>
            <div className="info">
              <p className="set-infos set-name">{sealedProductData.type}</p>
              <p className="cycle-name">{sealedProductData.set.series}</p>
              <p className="set-infos set-name">{sealedProductData.set.name}</p>
              <p className="set-infos set-name">
                {sealedProductData.set.id.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="inputs">
            <div className="select-fields">
              <p>1st Edition</p>
              <select
                value={firstEdition ? 'yes' : 'no'}
                onChange={(e) =>
                  e.target.value === 'yes'
                    ? setFirstEdition(true)
                    : setFirstEdition(false)
                }
                className="select"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="select-fields">
              <p>Language</p>
              <select
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                value={language}
                className="select"
              >
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="japanese">Japanese</option>
                <option value="french">French</option>
                <option value="dutch">Dutch</option>
                <option value="spanish">Spanish</option>
                <option value="portuguese">Portuguese</option>
                <option value="italian">Italian</option>
                <option value="korean">Korean</option>
                <option value="indonesian">Indonesian</option>
                <option value="thai">Thai</option>
                <option value="traditional chinese">Traditional Chinese</option>
                <option value="simplified chinese">Simplified Chinese</option>
              </select>
            </div>

            <div className="select-fields">
              <p>Purchase Price</p>
              <div className="select-purchase-price">
                <input
                  type="number"
                  placeholder="0.00"
                  value={purchasePrice}
                  onChange={(e) => {
                    setPurchasePrice(e.target.value);
                  }}
                  onFocus={() => {
                    setPurchasePrice('');
                  }}
                  onBlur={(e) => {
                    let newValue = 0;
                    if (e.target.value < 0) {
                      newValue = (e.target.value * -1).toFixed(2);
                    } else {
                      newValue = Number(e.target.value).toFixed(2);
                    }
                    setPurchasePrice(newValue);
                  }}
                />
                <p className="select-purchase-price-euro">€</p>
              </div>
            </div>

            <div className="select-fields">
              <p>Amount</p>
              <div className="select-amount">
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  onFocus={() => {
                    setAmount('');
                  }}
                  onBlur={(e) => {
                    let newValue = 0;
                    if (e.target.value < 0) {
                      newValue = Math.trunc(e.target.value * -1);
                    } else {
                      newValue = Math.trunc(e.target.value);
                    }
                    setAmount(newValue);
                  }}
                />
              </div>
            </div>

            <div className="select-fields">
              <p>Collection</p>
              <select
                value={collection}
                onChange={(e) => {
                  setCollection(e.target.value);
                }}
                className="select"
              >
                {userData.collections.map((entry, index) => {
                  return (
                    <option key={index} value={entry.collectionName}>
                      {entry.collectionName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="espm-button-wrapper">
            <button
              onClick={() => {
                handleUpdateProduct();
              }}
              className="add-button"
            >
              Update Product
            </button>
            <button
              className="espm-delete-button"
              onClick={() => {
                handleScrollCalculation();
                toggleDeleteProductConfirmationModal();
              }}
            >
              Delete Product
            </button>
          </div>
        </div>
        {isDeleteProductConfirmationModalOpen ? (
          <DeleteProductConfirmationModal
            scrollY={scrollY}
            content={content}
            sealedProductData={sealedProductData}
            toggleDeleteProductConfirmationModal={
              toggleDeleteProductConfirmationModal
            }
            toggleEditSealedProductModal={toggleEditSealedProductModal}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EditSealedProductModal;
