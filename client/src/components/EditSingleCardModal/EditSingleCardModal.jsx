import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import CloseButton from '../CloseButton/CloseButton';
import './EditSingleCardModal.scss';

const EditSingleCardModal = ({
    isEditSingleCardModalOpen,
    toggleEditSingleCardModal,
    content,
    initialPurchasePrice,
    initialLanguage,
    initialCondition,
    initialGrade,
    initialCollection
}) => {
  const { userData, setUserData } = useContext(UserDataContext);

  const [firstEdition, setFirstEdition] = useState(false);
  const [reverseHolo, setReverseHolo] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  const [condition, setCondition] = useState(initialCondition);
  const [grade, setGrade] = useState(initialGrade);
  const [purchasePrice, setPurchasePrice] = useState(initialPurchasePrice);
  const [collection, setCollection] = useState(initialCollection);

  const handleConditionSelection = (e) => {
    const selectedCondition = e.target.value;
    setCondition(selectedCondition);

    if (selectedCondition !== '') {
      document.querySelector('#gradeSelection').setAttribute('disabled', true);
    } else
      document.querySelector('#gradeSelection').removeAttribute('disabled');
  };

  const handleGradeSelection = (e) => {
    const selectedGrade = e.target.value;
    setGrade(selectedGrade);

    if (selectedGrade !== '') {
      document
        .querySelector('#conditionSelection')
        .setAttribute('disabled', true);
    } else
      document.querySelector('#conditionSelection').removeAttribute('disabled');
  };

  const handleAddCard = async () => {
    const newSingleCard = {
      id: content.id,
      firstEdition: firstEdition,
      reverseHolo: reverseHolo,
      language: language,
      condition: condition,
      grade: grade === '' ? grade : Number(grade),
      purchasePrice: Number(purchasePrice),
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

    data.collections[collectionIndex].collectionContent.singleCards.push(
      newSingleCard
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
      className="EditSingleCardModal"
      style={{ overflowY: isEditSingleCardModalOpen ? 'scroll' : 'hidden' }}
    >
      <div className="close-button-wrapper">
        <CloseButton
          isEditSingleCardModalOpen={isEditSingleCardModalOpen}
          toggleEditSingleCardModal={toggleEditSingleCardModal}
        />
      </div>

      <div className="content">
        <div className="img-and-info-wrapper">
          <div className="img-wrapper">
            <img src={content[0].images.small} alt={content[0].id} />
          </div>
          <div className="info">
            <p className="title">{content[0].name}</p>
            <p className="set-infos">
              {content[0].number} | {content[0].set.printedTotal}
            </p>
            <p className="set-infos">{content[0].rarity}</p>
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
              className="select"
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="select-fields">
            <p>Reverse Holo</p>
            <select
              onChange={(e) =>
                e.target.value === 'yes'
                  ? setReverseHolo(true)
                  : setReverseHolo(false)
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
            <p
              style={{
                color: grade ? 'rgb(100, 100, 100)' : '',
              }}
            >
              Condition
            </p>
            <select
              className="select"
              id="conditionSelection"
              value={condition}
              onChange={handleConditionSelection}
              style={{
                backgroundColor: grade ? 'rgb(75, 75, 75)' : '',
              }}
            >
              <option value=""></option>
              <option value="mint">Mint</option>
              <option value="near mint">Near Mint</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="light played">Light Played</option>
              <option value="played">Played</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="select-fields">
            <p
              style={{
                color: condition ? 'rgb(100, 100, 100)' : '',
              }}
            >
              Grade
            </p>
            <select
              className="select"
              id="gradeSelection"
              value={grade}
              onChange={handleGradeSelection}
              style={{
                backgroundColor: condition ? 'rgb(75, 75, 75)' : '',
              }}
            >
              <option value=""></option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1.5">1.5</option>
              <option value="1">1</option>
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
            handleAddCard();
            toggleEditSingleCardModal();
          }}
          className="add-button"
        >
          Update card
        </button>
      </div>
    </div>
  );
};

export default EditSingleCardModal;