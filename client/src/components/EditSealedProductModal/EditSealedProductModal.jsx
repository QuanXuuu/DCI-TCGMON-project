import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import CloseButton from '../CloseButton/CloseButton';
import './EditSealedProductModal.scss';

const EditSealedProductModal = ({
    isEditSealedProductModalOpen,
    toggleEditSealedProductModal,
    content,
    initialPurchasePrice,
    initialLanguage,
    initialAmount,
    initialFirstEdition,
    initialCollection
}) => {
  const { userData, setUserData } = useContext(UserDataContext);

  const [firstEdition, setFirstEdition] = useState(initialFirstEdition);
  const [language, setLanguage] = useState(initialLanguage);
  const [purchasePrice, setPurchasePrice] = useState(initialPurchasePrice);
  const [amount, setAmount] = useState(initialAmount);
  const [collection, setCollection] = useState(initialCollection);

  const handleAddProduct = async () => {
    const newSealedProduct = {
      id: content.id,
      firstEdition: firstEdition,
      language: language,
      purchasePrice: Number(purchasePrice),
      amount: Number(amount),
    };

    const selectedCollection = collection;

    const fetchUserData = await fetch(`/api/users/bob@bob.de`, {
      method: 'GET',
    });
    const data = await fetchUserData.json();

    const collectionIndex = data.collections.findIndex(
      (entry) =>
        entry.collectionName.toLowerCase() === selectedCollection.toLowerCase()
    );

    data.collections[collectionIndex].collectionContent.sealedProducts.push(
      newSealedProduct
    );

    await fetch(`/api/users/bob@bob.de`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setUserData(data);
  };

  return (
    <div
      className="EditSealedProductModal"
      style={{ overflowY: isEditSealedProductModalOpen ? 'scroll' : 'hidden' }}
    >
      <div className="close-button-wrapper">
        <CloseButton
          isEditSealedProductModalOpen={isEditSealedProductModalOpen}
          toggleEditSealedProductModal={toggleEditSealedProductModal}
        />
      </div>

      <div className="content">
        <div className="img-and-info-wrapper">
          <div className="img-wrapper-sealed">
            <img src={content[0].images.small} alt={content[0].id} />
          </div>
          <div className="info">
            <p className="title">{content[0].name}</p>
            <p className="set-infos set-name">{content.type}</p>
            <p className="cycle-name">{content[0].set.series}</p>
            <p className="set-infos set-name">{content[0].set.name}</p>
            <p className="set-infos set-name">{content[0].set.id.toUpperCase()}</p>
          </div>
        </div>
        <div className="inputs">
          <div className="select-fields">
            <p>1st Edition</p>
            <select
              onChange={(e) =>
                e.target.value === 'yes'
                  ? setFirstEdition(true)
                  : setFirstEdition(false)
              }
              value={firstEdition}
              className="select"
            >
              <option value=""></option>
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
              <option value=""></option>
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
              onChange={(e) => {
                setCollection(e.target.value);
                }}
                value={collection} 
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

        <button
          onClick={() => {
            handleAddProduct();
            toggleEditSealedProductModal();
          }}
          className="add-button"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditSealedProductModal;
