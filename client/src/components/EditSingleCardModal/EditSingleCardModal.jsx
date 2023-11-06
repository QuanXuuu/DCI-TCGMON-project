import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import CloseButton from '../CloseButton/CloseButton';
import './EditSingleCardModal.scss';

const EditSingleCardModal = ({
  isEditSingleCardModalOpen,
  toggleEditSingleCardModal,
  content,
  singleCardData,
}) => {
  const params = useParams();

  const { userData, setUserData } = useContext(UserDataContext);

  const [firstEdition, setFirstEdition] = useState(content.firstEdition);
  const [reverseHolo, setReverseHolo] = useState(content.reverseHolo);
  const [language, setLanguage] = useState(content.language);
  const [condition, setCondition] = useState(content.condition);
  const [grade, setGrade] = useState(content.grade);
  const [purchasePrice, setPurchasePrice] = useState(
    content.purchasePrice.toFixed(2)
  );
  const [collection, setCollection] = useState(params.id);
  const [initialCollection] = useState(params.id);

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

  const handleUpdateCard = async () => {
    const updatedSingleCard = {
      entryId: content.entryId,
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

    const initialCollectionIndex = data.collections.findIndex(
      (entry) =>
        entry.collectionName.toLowerCase() === initialCollection.toLowerCase()
    );

    const entryIndex = data.collections[
      initialCollectionIndex
    ].collectionContent.singleCards.findIndex(
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
      ].collectionContent.singleCards.splice(entryIndex, 1);

      data.collections[newCollectionIndex].collectionContent.singleCards.push(
        updatedSingleCard
      );
    } else {
      data.collections[initialCollectionIndex].collectionContent.singleCards[
        entryIndex
      ] = updatedSingleCard;
    }

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
            <img src={singleCardData.images.small} alt={singleCardData.id} />
          </div>
          <div className="info">
            <p className="title">{singleCardData.name}</p>
            <p className="set-infos">
              {singleCardData.number} | {singleCardData.set.printedTotal}
            </p>
            <p className="set-infos">{singleCardData.rarity}</p>
            <p className="cycle-name">{singleCardData.set.series}</p>
            <p className="set-infos set-name">{singleCardData.set.name}</p>
            <p className="set-infos set-name">
              {singleCardData.set.id.toUpperCase()}
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
            <p>Reverse Holo</p>
            <select
              value={reverseHolo ? 'yes' : 'no'}
              onChange={(e) =>
                e.target.value === 'yes'
                  ? setReverseHolo(true)
                  : setReverseHolo(false)
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
        <button
          onClick={() => {
            handleUpdateCard();
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
