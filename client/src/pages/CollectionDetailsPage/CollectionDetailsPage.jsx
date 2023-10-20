import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import SealedProductsHeader from '../../components/SealedProductsHeader/SealedProductsHeader';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';

import './CollectionDetailsPage.scss';

const CollectionDetailsPage = () => {
  return (
    <div className="CollectionDetailsPage">
      <Header color={'black'} background={'transparent'}/>

      <div className="page-wrapper">
        <ReturnButton text={'Search'} link={'search'} />
        <div className="headline-wrapper">
          <h1>Collection#1</h1>
          <button className="edit">
            <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
          </button>
        </div>

        <div className="details-info-wrapper">
          <p>
            <span className="bold">12,000 </span>
            Single Cards
          </p>
          <p>
            <span className="bold">12,000 </span>
            Sealed Products
          </p>
          <div className="purchase-price-wrapper">
            <p>
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="bold">62,280.50</span>€
            </p>
            <p className="green-number">
              +<span className="bold">21,700.00</span>€
            </p>
          </div>
          <div className="market-price-wrapper">
            <p className="green-number">
              <FontAwesomeIcon icon={faChartLine} />
              <span className="bold">83,980.50</span>€
            </p>
            <p className="green-number">
              +<span className="bold">34.84</span>%
            </p>
          </div>
          <button className="market-data-button">Market Data</button>
        </div>

        <div className="detail-cards-wrapper">
          <SealedProductsHeader />
          <h4>Scarlet & Violet</h4>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsPage;
