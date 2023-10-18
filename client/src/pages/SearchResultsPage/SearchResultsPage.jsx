import { useState, useContext } from 'react';
import SearchTermContext from '../../contexts/SearchTermContext';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import './SearchResultsPage.scss';

const SearchResultsPage = () => {
  const searchTerm = useContext(SearchTermContext);

  const [singleCardResultsAmount, setSingleCardResultsAmount] = useState(102);
  const [sealedProductsResultsAmount, setSealedProductsResultsAmount] =
    useState(7);

  return (
    <div className="SearchResultsPage">
      <Header color={'black'} />
      <div className="page-wrapper">
        <ReturnButton text={'Search'} />
        <div className="headline-wrapper">
          <h1>Search results for</h1>
          <h1 className="underlined">{searchTerm.searchTerm}</h1>
        </div>
        <div className="results-info-wrapper">
          <p>
            <span className="bold">{singleCardResultsAmount}</span> Single Cards
          </p>
          <p>
            <span className="bold">{sealedProductsResultsAmount}</span> Sealed
            Products
          </p>
        </div>
        <div className="results-wrapper">
          <div className="results-headline">
            <button className="results-options-button">
              <FontAwesomeIcon
                icon={faSort}
                className="results-options-button-icon"
              />
            </button>
            <h1>Single Cards</h1>
            <button className="results-options-button">
              <FontAwesomeIcon
                icon={faFilter}
                className="results-options-button-icon"
              />
            </button>
          </div>
          <div className="results">Karten und so</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
