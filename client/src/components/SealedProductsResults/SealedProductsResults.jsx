import SearchResultProduct from '../SearchResultProduct/SearchResultProduct';
import SealedProductsHeader from '../../components/SealedProductsHeader/SealedProductsHeader';
import './SealedProductsResults.scss';

const SealedProductsResults = ({ content, toggleSuccessModal }) => {
  return (
    <div className="SealedProductsResults">
      <SealedProductsHeader />
      <div className="sealed-products-results-wrapper">
        {content.data
          .sort((a, b) => {
            const dateComparison =
              new Date(a.set.releaseDate) - new Date(b.set.releaseDate);

            if (dateComparison !== 0) {
              return dateComparison;
            }

            const idA = a.id;
            const idB = b.id;

            const aParts = idA.split('-');
            const bParts = idB.split('-');

            const aAlpha = aParts[0];
            const bAlpha = bParts[0];
            const alphaComparison = aAlpha.localeCompare(bAlpha);

            if (alphaComparison !== 0) {
              return alphaComparison;
            }

            const aNum = parseInt(aParts[1]);
            const bNum = parseInt(bParts[1]);

            return aNum - bNum;
          })

          .sort((a, b) => {
            const typeA = a.type;
            const typeB = b.type;

            if (typeA === undefined && typeB === undefined) {
              return 0;
            } else if (typeA === undefined) {
              return -1;
            } else if (typeB === undefined) {
              return 1;
            } else return typeA.localeCompare(typeB);
          })

          .map((result, index) => {
            return (
              <SearchResultProduct
                key={index}
                content={result}
                toggleSuccessModal={toggleSuccessModal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SealedProductsResults;
