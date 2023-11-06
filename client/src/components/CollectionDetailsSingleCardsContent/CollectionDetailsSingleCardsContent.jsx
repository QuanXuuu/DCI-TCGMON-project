import SingleCardsHeader from '../SingleCardsHeader/SingleCardsHeader';
import CollectionDetailsSingleCard from '../CollectionDetailsSingleCard/CollectionDetailsSingleCard';
import './CollectionDetailsSingleCardsContent.scss';

const CollectionDetailsSingleCardsContent = ({
  content,
  singleCardData,
  marketTotal,
  collectionNameProp
}) => {
  return (
    <div className="CollectionDetailsSingleCardsContent">
      <SingleCardsHeader />
      <div className="collection-details-single-cards-content-wrapper">
        {content.map((entry, index) => {
          return (
            <CollectionDetailsSingleCard
              key={index}
              content={entry}
              singleCardData={singleCardData}
              marketTotal={marketTotal}
              collectionNameProp={collectionNameProp}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionDetailsSingleCardsContent;
