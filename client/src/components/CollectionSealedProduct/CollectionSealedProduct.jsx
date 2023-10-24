import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import './CollectionSealedProduct.scss';
import productImageExample from '../../assets/images/productImageExample.png';

const CollectionSealedProduct = () => {
  return (
    <div className="CollectionSealedProduct">
      <div className='ranking-number'>
        <p>4</p>
      </div>
      <div className='CollectionSealedProductContent'>
        <div className='top-wrapper'>
          <div className="collection-product-image-wrapper">
            <img src={productImageExample} />
          </div>
          <div className='CollectionSealedProductInfo'>
            <div className='CollectionSealedProductTitle'>
              <p>Scarlet & Violet 36er Booster Box</p>
              <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
            </div>
            <p className='edition'>SV01</p> {/* EDITION?????????? */}
            <div className='LanguageAndEdition'>
              <p>English</p>
              <p>1st Edition</p>
            </div>

            <div className='product-price-infos'>

              <div className='price-infos'>
                <p>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="bold">93,50</span> €
                </p>
                <p className="green-number">
                  +<span className="bold2">72.00</span> €
                </p>
              </div>  

              <div className='price-infos'>
                <p className="green-number">
                  <FontAwesomeIcon icon={faChartLine} />
                  <span className="bold">165,50</span> €
                </p>
                <p className="green-number">
                  +<span className="bold2">77.00</span> €
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-wrapper'>
          <button className="market-data-button">Market Data</button>
          <p className="pie-percentage-and-total">
            <FontAwesomeIcon icon={faChartPie} />
            <span className="bold">165,50</span> €
          </p>
          <p className="pie-percentage-and-total green">
            <span>Total</span>
            <span className="bold">662,00</span> €
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionSealedProduct;
