import SearchResultProduct from '../SearchResultProduct/SearchResultProduct';
import SealedProductsHeader from '../../components/SealedProductsHeader/SealedProductsHeader';
import './SealedProductsResults.scss';

const SealedProductsResults = ({ content }) => {
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

          .sort((a, b) => a.type.localeCompare(b.type))
          .map((result, index) => {
            return <SearchResultProduct key={index} content={result} />;
          })}
      </div>
    </div>
  );
};

export default SealedProductsResults;
