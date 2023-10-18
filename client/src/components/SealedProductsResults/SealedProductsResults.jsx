import SearchResultProduct from '../SearchResultProduct/SearchResultProduct';
import SealedProductsHeader from '../../components/SealedProductsHeader/SealedProductsHeader';
import './SealedProductsResults.scss';

const SealedProductsResults = ({ content }) => {
  return (
    <div className="SealedProductsResults">
      <SealedProductsHeader />
      <div className="sealed-products-results-wrapper">
        {content.data.map((result, index) => {
          return <SearchResultProduct key={index} content={result} />;
        })}
      </div>
    </div>
  );
};

export default SealedProductsResults;
