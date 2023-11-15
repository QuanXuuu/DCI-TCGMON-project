import CollectionSummary from '../CollectionSummary/CollectionSummary';
import './CollectionSummaryContainer.scss';

const CollectionSummaryContainer = ({ data }) => {
  return (
    <div className="CollectionSummaryContainer">
      {data.userData.collections.map((collection, index) => {
        return (
          <CollectionSummary
            key={index}
            collectionData={collection}
            singleCardsData={data.pokemonDataSingleCards}
            sealedProductsData={data.pokemonDataSealedProducts}
          />
        );
      })}
    </div>
  );
};

export default CollectionSummaryContainer;
