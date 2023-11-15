import { useEffect, useState, useContext } from 'react';
import CardDataContext from '../../contexts/CardDataContext';
import SingleCardsHeader from '../SingleCardsHeader/SingleCardsHeader';
import CollectionDetailsSingleCard from '../CollectionDetailsSingleCard/CollectionDetailsSingleCard';
import './CollectionDetailsSingleCardsContent.scss';

const CollectionDetailsSingleCardsContent = ({
  marketTotal,
  toggleSuccessModal,
}) => {
  const { cardContentData } = useContext(CardDataContext);

  const [isLoading, setIsLoading] = useState(true);
  const [collectionContent, setCollectionContent] = useState([]);
  const [singleCardData, setSingleCardData] = useState([]);

  useEffect(() => {
    setCollectionContent(
      cardContentData.collectionDetailsData.collectionContent.singleCards
    );
    setSingleCardData(cardContentData.pokemonDataSingleCards);
    setIsLoading(false);
  }, [cardContentData]);

  return isLoading ? null : (
    <div className="CollectionDetailsSingleCardsContent">
      <SingleCardsHeader />
      <div className="collection-details-single-cards-content-wrapper">
        {collectionContent &&
          collectionContent.map((entry, index) => {
            return (
              <CollectionDetailsSingleCard
                key={index}
                content={entry}
                singleCardData={singleCardData}
                marketTotal={marketTotal}
                toggleSuccessModal={toggleSuccessModal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CollectionDetailsSingleCardsContent;
