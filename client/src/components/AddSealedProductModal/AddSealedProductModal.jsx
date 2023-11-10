import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import CloseButton from '../CloseButton/CloseButton';
import './AddSealedProductModal.scss';

const AddSealedProductModal = ({
  content,
  isAddSealedProductModalOpen,
  toggleAddSealedProductModal,
  toggleSuccessModal,
}) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const { setSuccessModalText } = useContext(SuccessModalTextContext);

  const [firstEdition, setFirstEdition] = useState(false);
  const [language, setLanguage] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [amount, setAmount] = useState('');
  const [collection, setCollection] = useState('');

  const handleAddProduct = async () => {
    const newSealedProduct = {
      entryId: crypto.randomUUID(),
      id: content.id,
      firstEdition: firstEdition,
      language: language === '' ? 'english' : language,
      purchasePrice: Number(purchasePrice),
      amount: Number(amount) === 0 ? 1 : Number(amount),
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
    setSuccessModalText(
      <p>
      <span style={{ fontWeight: 'bold' }}>{content.name}</span> successfully added to{' '}
      <span style={{ fontWeight: 'bold' }}>{selectedCollection}</span>!
    </p>
    );
    toggleAddSealedProductModal();
    toggleSuccessModal();
  };

  return (
    <div
      className="AddSealedProductModal"
      style={{ overflowY: isAddSealedProductModalOpen ? 'scroll' : 'hidden' }}
    >
      <div className="close-button-wrapper">
        <CloseButton
          isAddSealedProductModalOpen={isAddSealedProductModalOpen}
          toggleAddSealedProductModal={toggleAddSealedProductModal}
        />
      </div>

      <div className="content">
        <p className="title">{content.name}</p>
        <div className="img-and-info-wrapper">
          <div className="img-wrapper-sealed">
            <img src={content.images.small} alt={content.id} />
          </div>
          <div className="info">
            <p className="set-infos set-name">{content.type}</p>
            <p className="cycle-name">{content.set.series}</p>
            <p className="set-infos set-name">{content.set.name}</p>
            <p className="set-infos set-name">{content.set.id.toUpperCase()}</p>
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
              className="select"
            >
              <option value=""></option>
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
          }}
          className="add-button"
        >
          Add card
        </button>
      </div>
    </div>
  );
};

export default AddSealedProductModal;
