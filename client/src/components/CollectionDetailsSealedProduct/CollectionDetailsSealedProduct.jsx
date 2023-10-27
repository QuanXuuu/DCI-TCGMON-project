import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import './CollectionDetailsSealedProduct.scss';

const CollectionDetailsSealedProduct = ({
  content,
  sealedProductData,
  marketTotal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sealedProduct, setSealedProduct] = useState();
  const [sealedProductColor, setSealedProductColor] = useState('');

  useEffect(() => {
    const sealedProduct = sealedProductData.data.filter(
      (entry) => content.id === entry.id
    );
    setSealedProduct(sealedProduct);

    if (content.marketPrice > content.purchasePrice) {
      setSealedProductColor('green');
    }

    if (content.marketPrice < content.purchasePrice) {
      setSealedProductColor('red');
    }

    setIsLoading(false);
  }, []);

  return isLoading ? null : (
    <div className="CollectionDetailsSealedProduct">
      <div className="cdsp-amount">
        <p>{content.amount}</p>
      </div>
      <button className="cdsp-edit-button">
        <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
      </button>
      <div className="cdsp-content-wrapper">
        <div className="cdsp-content-top-wrapper">
          <div className="cdsp-content-top-image">
            <img src={sealedProduct[0].images.small} />
          </div>
          <div className="cdsp-content-top-data-wrapper">
            <div className="cdsp-content-top-data-info-wrapper">
              <div className="cdsp-content-top-data-info-title bold">
                <p>{sealedProduct[0].name}</p>
              </div>
              <p>{sealedProduct[0].set.id.toUpperCase()}</p>
              <div className="cdsp-content-top-data-info-language-edition-wrapper">
                <p>{content.language}</p>
                <p className={content.firstEdition ? null : 'disabled'}>
                  1st Edition
                </p>
              </div>
            </div>
            <div className="cdsp-content-top-data-price-wrapper">
              <div className="cdsp-content-top-data-price-left-wrapper">
                <div className="cdsp-content-top-data-price-purchase-market">
                  <div className="cdsp-content-icon-wrapper">
                    <FontAwesomeIcon icon={faCartShopping} className="icon" />
                  </div>
                  <p className="bold">{`${content.purchasePrice.toFixed(
                    2
                  )} €`}</p>
                </div>
                <div className="cdsp-content-top-data-price-purchase-market">
                  <div className="cdsp-content-icon-wrapper">
                    <FontAwesomeIcon icon={faChartLine} className="icon" />
                  </div>
                  <p
                    className={`bold ${sealedProductColor}`}
                  >{`${content.marketPrice.toFixed(2)} €`}</p>
                </div>
              </div>
              <div className="cdsp-content-top-data-price-right-wrapper">
                <p className={`bold ${sealedProductColor}`}>
                  {(content.marketPrice - content.purchasePrice).toFixed(2) < 0
                    ? `${(content.marketPrice - content.purchasePrice).toFixed(
                        2
                      )} €`
                    : `+${(content.marketPrice - content.purchasePrice).toFixed(
                        2
                      )} €`}
                </p>
                <p className={`bold ${sealedProductColor}`}>
                  {(
                    (content.marketPrice / content.purchasePrice - 1) *
                    100
                  ).toFixed(2) < 0
                    ? `${(
                        (content.marketPrice / content.purchasePrice - 1) *
                        100
                      ).toFixed(2)} %`
                    : `+${(
                        (content.marketPrice / content.purchasePrice - 1) *
                        100
                      ).toFixed(2)} %`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cdsp-content-bottom-wrapper">
          <button className="cdsp-content-bottom-market-data-button">
            Market Data
          </button>
          <div className="cdsp-content-bottom-portfolio-share">
            <div className="cdsp-content-icon-wrapper">
              <FontAwesomeIcon icon={faChartPie} className="icon" />
            </div>
            <p className="bold">{`${(
              ((content.marketPrice * content.amount) / marketTotal) *
              100
            ).toFixed(2)} %`}</p>
          </div>
          <div className="cdsp-content-bottom-total">
            <p>Total</p>
            <p className="bold">{`${(
              content.marketPrice * content.amount
            ).toFixed(2)} €`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsSealedProduct;