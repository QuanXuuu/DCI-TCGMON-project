import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCube, faCoins } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/images/pokemon-logo.svg';
import './CollectionSummary.scss';

const CollectionSummary = ({ content }) => {
  return (
    <div className="CollectionSummary">
      <div className="collection-tcg-type-logo">
        <img src={Logo} alt="tcg-logo" />
      </div>
      <div className="collection-title-wrapper">
        <h2>{content.collectionName}</h2>
      </div>
      <div className="card-count-wrapper">
        <p className="card-count">
          {content.collectionContent.singleCards.length}
        </p>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </div>
      <div className="product-count-wrapper">
        <p className="product-count">
          {content.collectionContent.sealedProducts.length}
        </p>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCube} />
        </div>
      </div>
      <div className="collection-value-wrapper">
        <p className="collection-value">
          1.001.280<span>€</span>
        </p>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCoins} />
        </div>
      </div>
      <button className="collection-details-link">View collection</button>
    </div>
  );
};

export default CollectionSummary;
