import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import EditSingleCardModal from '../EditSingleCardModal/EditSingleCardModal';
import './CollectionDetailsSingleCard.scss';

const CollectionDetailsSingleCard = ({
  content,
  singleCardData,
  marketTotal,
  toggleSuccessModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [singleCard, setSingleCard] = useState();
  const [singleCardColor, setSingleCardColor] = useState('');
  const [isEditSingleCardModalOpen, setIsEditSingleCardModalOpen] =
    useState(false);

  const toggleEditSingleCardModal = () => {
    setIsEditSingleCardModalOpen(!isEditSingleCardModalOpen);
  };

  useEffect(() => {
    const singleCard = singleCardData.data.filter(
      (entry) => content.id === entry.id
    );
    setSingleCard(singleCard);

    if (content.marketPrice > content.purchasePrice) {
      setSingleCardColor('green');
    }

    if (content.marketPrice < content.purchasePrice) {
      setSingleCardColor('red');
    }

    setIsLoading(false);
  }, [content, singleCardData]);

  useEffect(() => {
    if (isEditSingleCardModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditSingleCardModalOpen]);

  return isLoading ? null : (
    <div className="CollectionDetailsSingleCard">
      <button className="cdsc-edit-button">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="edit-icon"
          onClick={toggleEditSingleCardModal}
        />
      </button>
      {isEditSingleCardModalOpen && (
        <EditSingleCardModal
          isEditSingleCardModalOpen={isEditSingleCardModalOpen}
          toggleEditSingleCardModal={toggleEditSingleCardModal}
          content={content}
          singleCardData={singleCard[0]}
          toggleSuccessModal={toggleSuccessModal}
        />
      )}
      <div className="cdsc-content-wrapper">
        <div className="cdsc-content-top-wrapper">
          <div className="cdsc-content-top-image">
            <img src={singleCard[0].images.small} />
          </div>
          <div className="cdsc-content-top-data-wrapper">
            <div className="cdsc-content-top-data-title-wrapper">
              <div className="cdsc-content-top-data-title bold">
                <p>{singleCard[0].name}</p>
              </div>
              <p>{`${singleCard[0].number} | ${singleCard[0].set.printedTotal}`}</p>
              <p>{singleCard[0].rarity}</p>
            </div>
            <div className="cdsc-content-top-data-info-wrapper">
              <div className="cdsc-content-top-data-info-language-condition-wrapper">
                <p>{content.language}</p>
                <p>
                  {content.condition !== ''
                    ? content.condition
                    : `PSA ${content.grade}`}
                </p>
              </div>
              <div className="cdsc-content-top-data-info-edition-reverse-wrapper">
                <p className={content.firstEdition ? null : 'disabled'}>
                  1st Edition
                </p>
                <p className={content.reverseHolo ? null : 'disabled'}>
                  Reverse Holo
                </p>
              </div>
            </div>
            <div className="cdsc-content-top-data-price-wrapper">
              <div className="cdsc-content-top-data-price-left-wrapper">
                <div className="cdsc-content-top-data-price-purchase-market">
                  <div className="cdsc-content-icon-wrapper">
                    <FontAwesomeIcon icon={faCartShopping} className="icon" />
                  </div>
                  <p className="bold">
                    {content.purchasePrice >= 1000
                      ? `${Math.round(content.purchasePrice)} €`
                      : `${content.purchasePrice.toFixed(2)} €`}
                  </p>
                </div>
                <div className="cdsc-content-top-data-price-purchase-market">
                  <div className="cdsc-content-icon-wrapper">
                    <FontAwesomeIcon icon={faChartLine} className="icon" />
                  </div>
                  <p className={`bold ${singleCardColor}`}>
                    {content.marketPrice >= 1000
                      ? `${Math.round(content.marketPrice)} €`
                      : `${content.marketPrice.toFixed(2)} €`}
                  </p>
                </div>
              </div>
              <div className="cdsc-content-top-data-price-right-wrapper">
                <p className={`bold ${singleCardColor}`}>
                  {(content.marketPrice - content.purchasePrice).toFixed(2) < 0
                    ? `${(content.marketPrice - content.purchasePrice).toFixed(
                        2
                      )} €`
                    : content.marketPrice - content.purchasePrice >= 1000
                    ? `+${Math.round(
                        content.marketPrice - content.purchasePrice
                      )} €`
                    : `+${(content.marketPrice - content.purchasePrice).toFixed(
                        2
                      )} €`}
                </p>
                <p className={`bold ${singleCardColor}`}>
                  {content.purchasePrice === 0
                    ? '∞ %'
                    : (content.marketPrice / content.purchasePrice - 1) * 100 <
                      0
                    ? `${(
                        (content.marketPrice / content.purchasePrice - 1) *
                        100
                      ).toFixed(2)} %`
                    : (content.marketPrice / content.purchasePrice - 1) * 100 >=
                      1000
                    ? `+${Math.round(
                        (content.marketPrice / content.purchasePrice - 1) * 100
                      )} %`
                    : `+${(
                        (content.marketPrice / content.purchasePrice - 1) *
                        100
                      ).toFixed(2)} %`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cdsc-content-bottom-wrapper">
          <button className="cdsc-content-bottom-market-data-button">
            Market Data
          </button>
          <div className="cdsc-content-bottom-portfolio-share">
            <div className="cdsc-content-icon-wrapper">
              <FontAwesomeIcon icon={faChartPie} className="icon" />
            </div>
            <p className="bold">{`${(
              (content.marketPrice / marketTotal) *
              100
            ).toFixed(2)} %`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsSingleCard;
