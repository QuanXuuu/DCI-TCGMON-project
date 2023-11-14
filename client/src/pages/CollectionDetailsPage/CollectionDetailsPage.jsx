import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CardDataContext from '../../contexts/CardDataContext';
import ProductDataContext from '../../contexts/ProductDataContext';
import UserDataContext from '../../contexts/UserDataContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import EditCollectionModal from '../../components/EditCollectionModal/EditCollectionModal';
import CollectionDetailsSingleCardsContent from '../../components/CollectionDetailsSingleCardsContent/CollectionDetailsSingleCardsContent';
import CollectionDetailsSealedProductsContent from '../../components/CollectionDetailsSealedProductsContent/CollectionDetailsSealedProductsContent';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal';
import './CollectionDetailsPage.scss';

const CollectionDetailsPage = () => {
  const params = useParams();

  const { setCardContentData } = useContext(CardDataContext);
  const { setProductContentData } = useContext(ProductDataContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const { successModalText } = useContext(SuccessModalTextContext);

  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState();
  const [purchaseTotal, setPurchaseTotal] = useState();
  const [marketTotal, setMarketTotal] = useState();
  const [color, setColor] = useState('');

  const [isEditCollectionModalOpen, setIsEditCollectionModalOpen] =
    useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const toggleCollectionDetailsSuccessModal = () => {
    setIsSuccessModalOpen((prev) => !prev);

    setTimeout(() => {
      setIsSuccessModalOpen((prev) => !prev);
    }, 4000);
  };

  const toggleEditCollectionModal = () => {
    setIsEditCollectionModalOpen(!isEditCollectionModalOpen);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user === null) return navigate('/');

    if (!userData) {
      const fetchUserData = async () => {
        const response = await fetch(`/api/user/${user.data.user.email}`, {
          method: 'GET',
        });
        const userData = await response.json();
        setUserData(userData);
      };
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      generateCollectionDetailsData();
    }
  }, [userData, params.id]);

  useEffect(() => {
    if (isEditCollectionModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditCollectionModalOpen]);

  const generateCollectionDetailsData = async () => {
    const singleCardsQueryStringArray = [];
    const sealedProductsQueryStringArray = [];

    const collectionDetailsData = userData.collections.find(
      (collection) => collection.collectionName === `${params.id}`
    );

    collectionDetailsData.collectionContent.singleCards.map((entry) => {
      return singleCardsQueryStringArray.push(`id:"${entry.id}"`);
    });

    collectionDetailsData.collectionContent.sealedProducts.map((entry) => {
      return sealedProductsQueryStringArray.push(`id:"${entry.id}"`);
    });

    const singleCardsQueryString = singleCardsQueryStringArray.join(' OR ');
    const sealedProductsQueryString =
      sealedProductsQueryStringArray.join(' OR ');

    if (!singleCardsQueryString && !sealedProductsQueryString) {
      setCollectionData(collectionDetailsData);

      const newCardData = { collectionDetailsData };
      setCardContentData(newCardData);

      const newProductData = { collectionDetailsData };
      setProductContentData(newProductData);

      setPurchaseTotal('0.00');
      setMarketTotal('0.00');
      setColor('black');
      setIsLoading(false);
      return;
    }

    if (singleCardsQueryString) {
      const fetchPokemonDataSingleCards = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=(${singleCardsQueryString})`,
        {
          method: 'GET',
        }
      );
      const pokemonDataSingleCards = await fetchPokemonDataSingleCards.json();

      collectionDetailsData.collectionContent.singleCards.map((userEntry) => {
        const priceData = pokemonDataSingleCards.data.filter(
          (pokemonEntry) => userEntry.id === pokemonEntry.id
        );

        return (userEntry.marketPrice =
          priceData[0].cardmarket.prices.averageSellPrice);
      });

      const newCardData = { collectionDetailsData, pokemonDataSingleCards };
      setCardContentData(newCardData);
    }

    if (sealedProductsQueryString) {
      const fetchPokemonDataSealedProducts = await fetch(
        `https://api.pokemontcg.io/v2/sealed?q=(${sealedProductsQueryString})`,
        {
          method: 'GET',
        }
      );
      const pokemonDataSealedProducts =
        await fetchPokemonDataSealedProducts.json();

      collectionDetailsData.collectionContent.sealedProducts.map(
        (userEntry) => {
          const priceData = pokemonDataSealedProducts.data.filter(
            (pokemonEntry) => userEntry.id === pokemonEntry.id
          );

          return (userEntry.marketPrice = 1);
          // return (userEntry.marketPrice =
          //   priceData[0].tcgplayer.prices.normal.mid);
        }
      );

      const newProductData = {
        collectionDetailsData,
        pokemonDataSealedProducts,
      };
      setProductContentData(newProductData);
    }

    setCollectionData(collectionDetailsData);

    const setPrices = async () => {
      const purchaseTotal = await (
        collectionDetailsData.collectionContent.singleCards.reduce(
          (total, entry) => total + entry.purchasePrice,
          0
        ) +
        collectionDetailsData.collectionContent.sealedProducts.reduce(
          (total, entry) => total + entry.purchasePrice * entry.amount,
          0
        )
      ).toFixed(2);
      setPurchaseTotal(purchaseTotal);

      const marketTotal = await (
        collectionDetailsData.collectionContent.singleCards.reduce(
          (total, entry) => total + entry.marketPrice,
          0
        ) +
        collectionDetailsData.collectionContent.sealedProducts.reduce(
          (total, entry) => total + entry.marketPrice * entry.amount,
          0
        )
      ).toFixed(2);
      setMarketTotal(marketTotal);

      if (Number(purchaseTotal) < Number(marketTotal)) {
        setColor('green');
      }

      if (Number(purchaseTotal) > Number(marketTotal)) {
        setColor('red');
      }
    };

    setPrices();
    setIsLoading(false);
  };

  return isLoading ? null : (
    <div className="CollectionDetailsPage">
      <Header color={'black'} background={'transparent'} />

      <div className="page-wrapper">
        <ReturnButton text={'My Collections'} link={'collections'} />
        <div className="headline-wrapper">
          <h1>{collectionData.collectionName}</h1>
          <button className="edit" onClick={toggleEditCollectionModal}>
            <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
          </button>
          {isEditCollectionModalOpen && (
            <EditCollectionModal
              isEditCollectionModalOpen={isEditCollectionModalOpen}
              toggleEditCollectionModal={toggleEditCollectionModal}
              collectionData={collectionData}
              toggleSuccessModal={toggleCollectionDetailsSuccessModal}
            />
          )}
        </div>

        <div className="details-info-wrapper">
          <div className="collection-content-wrapper">
            <div className="text-wrapper">
              <span className="bold">
                {collectionData.collectionContent.singleCards.length}
              </span>
              Single Cards
            </div>
            <div className="text-wrapper">
              <span className="bold">
                {collectionData.collectionContent.sealedProducts.reduce(
                  (total, entry) => total + 1 * entry.amount,
                  0
                )}
              </span>
              Sealed Products
            </div>
          </div>

          <div className="price-wrapper">
            <div className="price-wrapper-left">
              <div className="text-wrapper">
                <div className="icon-wrapper">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="price-icon"
                  />
                </div>
                <span className="bold">{`${purchaseTotal} €`}</span>
              </div>
              <div className="text-wrapper">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faChartLine} className="price-icon" />
                </div>
                <span className={`bold ${color}`}>{`${marketTotal} €`}</span>
              </div>
            </div>
            <div className="price-wrapper-right">
              <div className="text-wrapper">
                <span className={`bold ${color}`}>
                  {(marketTotal - purchaseTotal).toFixed(2) < 0
                    ? `${(marketTotal - purchaseTotal).toFixed(2)} €`
                    : `+${(marketTotal - purchaseTotal).toFixed(2)} €`}
                </span>
              </div>
              <div className="text-wrapper">
                <span className={`bold ${color}`}>
                  {purchaseTotal === '0.00'
                    ? '∞ %'
                    : ((marketTotal / purchaseTotal - 1) * 100).toFixed(2) < 0
                    ? `${((marketTotal / purchaseTotal - 1) * 100).toFixed(
                        2
                      )} %`
                    : `+${((marketTotal / purchaseTotal - 1) * 100).toFixed(
                        2
                      )} %`}
                </span>
              </div>
            </div>
          </div>
          <button className="market-data-button">Market Data</button>
        </div>

        <div className="collection-details-content-wrapper">
          {collectionData.collectionContent.singleCards.length > 0 ? (
            <CollectionDetailsSingleCardsContent
              marketTotal={marketTotal}
              toggleSuccessModal={toggleCollectionDetailsSuccessModal}
            />
          ) : (
            <></>
          )}
          {collectionData.collectionContent.sealedProducts.length > 0 ? (
            <CollectionDetailsSealedProductsContent
              marketTotal={marketTotal}
              toggleSuccessModal={toggleCollectionDetailsSuccessModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {isSuccessModalOpen ? (
        <ErrorAndSuccessModal
          customClassName="success-modal"
          easmText={successModalText}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollectionDetailsPage;
