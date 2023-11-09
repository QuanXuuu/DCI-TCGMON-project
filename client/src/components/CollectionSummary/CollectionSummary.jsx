import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCube, faCoins } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/images/pokemon-logo.svg';
import './CollectionSummary.scss';

const CollectionSummary = ({
  collectionData,
  singleCardsData,
  sealedProductsData,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.querySelector('.CollectionSummaryContainer');
    container.scrollLeft = 0;
  }, []);

  collectionData.collectionContent.singleCards.map((userEntry) => {
    const priceData = singleCardsData.data.filter(
      (pokemonEntry) => userEntry.id === pokemonEntry.id
    );

    return (userEntry.marketPrice =
      priceData[0].cardmarket.prices.averageSellPrice);
  });

  collectionData.collectionContent.sealedProducts.map((userEntry) => {
    const priceData = sealedProductsData.data.filter(
      (pokemonEntry) => userEntry.id === pokemonEntry.id
    );

    // return (userEntry.marketPrice = priceData[0].tcgplayer.prices.normal.mid);
    return (userEntry.marketPrice = 1);
  });

  const totalValue =
    collectionData.collectionContent.singleCards.reduce(
      (total, entry) => total + entry.marketPrice,
      0
    ) +
    collectionData.collectionContent.sealedProducts.reduce(
      (total, entry) => total + entry.marketPrice * entry.amount,
      0
    );

  return (
    <div className="CollectionSummary">
      <div className="collection-tcg-type-logo">
        <img src={Logo} alt="tcg-logo" />
      </div>
      <div className="collection-title-wrapper">
        <h2>{collectionData.collectionName}</h2>
      </div>
      <div className="card-count-wrapper">
        <p className="card-count">
          {collectionData.collectionContent.singleCards.length}
        </p>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </div>
      <div className="product-count-wrapper">
        <p className="product-count">
          {collectionData.collectionContent.sealedProducts.reduce(
            (total, entry) => total + 1 * entry.amount,
            0
          )}
        </p>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCube} />
        </div>
      </div>
      <div className="collection-value-wrapper">
        <p className="collection-value">
          {totalValue.toFixed(2)}
          <span>€</span>
        </p>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCoins} />
        </div>
      </div>
      <button
        onClick={() =>
          navigate(`/collections/${collectionData.collectionName}`)
        }
        className="collection-details-link"
      >
        View collection
      </button>
    </div>
  );
};

export default CollectionSummary;
