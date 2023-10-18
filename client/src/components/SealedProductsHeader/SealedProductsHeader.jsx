import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import './SealedProductsHeader.scss';

const SealedProductsHeader = () => {
  return (
    <div className="SealedProductsHeader">
      <button className="options-button">
        <FontAwesomeIcon icon={faSort} className="options-button-icon" />
      </button>
      <h1>Sealed Products</h1>
      <button className="options-button">
        <FontAwesomeIcon icon={faFilter} className="options-button-icon" />
      </button>
    </div>
  );
};

export default SealedProductsHeader;
