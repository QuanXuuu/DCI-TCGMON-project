import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import SingleCardsHeader from '../../components/SingleCardsHeader/SingleCardsHeader';
import SealedProductsHeader from '../../components/SealedProductsHeader/SealedProductsHeader';
import EditCollectionModal from '../../components/EditCollectionModal/EditCollectionModal';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import CollectionSealedProduct from '../../components/CollectionSealedProduct/CollectionSealedProduct';
import './CollectionDetailsPage.scss';

const CollectionDetailsPage = () => {
  const params = useParams();

  const { userData, setUserData } = useContext(UserDataContext);
  const [pokemonData, setPokemonData] = useState();
  const [collectionData, setCollectionData] = useState();
  const [purchaseTotal, setPurchaseTotal] = useState();
  const [marketTotal, setMarketTotal] = useState();
  const [color, setColor] = useState();

  const [isEditCollectionModalOpen, setIsEditCollectionModalOpen] =
    useState(false);

  const toggleEditCollectionModal = () => {
    setIsEditCollectionModalOpen(!isEditCollectionModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseUser = await fetch(`/api/users/bob@bob.de`, {
        method: 'GET',
      });
      const dataUser = await responseUser.json();

      const queryStringArray = [];

      const collectionData = dataUser.collections.find(
        (collection) => collection.collectionName === `${params.id}`
      );

      collectionData.collectionContent.singleCards.map((entry) => {
        return queryStringArray.push(`id:"${entry.id}"`);
      });

      const queryString = queryStringArray.join(' OR ');

      if (!queryString) {
        setCollectionData(collectionData);
        setPurchaseTotal('0.00');
        setMarketTotal('0.00');
        setColor('black');
        return;
      } else {
        const responsePokemon = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=(${queryString})`,
          {
            method: 'GET',
          }
        );
        const dataPokemon = await responsePokemon.json();

        collectionData.collectionContent.singleCards.map((userEntry) => {
          const priceData = dataPokemon.data.filter(
            (pokemonEntry) => userEntry.id === pokemonEntry.id
          );

          return (userEntry.marketPrice =
            priceData[0].cardmarket.prices.averageSellPrice);
        });

        setCollectionData(collectionData);
        setPurchaseTotal(
          collectionData.collectionContent.singleCards
            .reduce((total, entry) => total + entry.purchasePrice, 0)
            .toFixed(2)
        );
        setMarketTotal(
          collectionData.collectionContent.singleCards
            .reduce((total, entry) => total + entry.marketPrice, 0)
            .toFixed(2)
        );

        if (marketTotal > purchaseTotal) {
          setColor('green');
        } else if (marketTotal < purchaseTotal) {
          setColor('red');
        } else setColor('black');
      }
    };

    fetchData();
  }, [params.id, marketTotal, purchaseTotal]);

  return !color ? null : (
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
                {collectionData.collectionContent.sealedProducts.length}
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
                  {((marketTotal / purchaseTotal - 1) * 100).toFixed(2) < 0
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

        <div className="detail-cards-wrapper">
          <SealedProductsHeader />
          <h4>Scarlet & Violet</h4>
          <CollectionSealedProduct />
          <h4>Scarlet & Violet</h4>
          <CollectionSealedProduct />
          <h4>Scarlet & Violet</h4>
          <CollectionSealedProduct />
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsPage;
