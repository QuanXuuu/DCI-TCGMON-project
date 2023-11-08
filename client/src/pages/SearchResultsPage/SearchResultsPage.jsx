import { useState, useContext, useEffect } from 'react';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import SingleCardsResults from '../../components/SingleCardsResults/SingleCardsResults';
import SealedProductsResults from '../../components/SealedProductsResults/SealedProductsResults';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal';
import './SearchResultsPage.scss';

const SearchResultsPage = () => {
  const searchQuery = useContext(SearchQueryContext);
  const { successModalText } = useContext(SuccessModalTextContext);

  const [singleCardSearchResults, setSingleCardSearchResults] = useState({});
  const [sealedProductSearchResults, setSealedProductSearchResults] = useState(
    {}
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const toggleSearchResultsSuccessModal = () => {
    setIsSuccessModalOpen((prev) => !prev);

    setTimeout(() => {
      setIsSuccessModalOpen((prev) => !prev);
    }, 4000);
  };

  useEffect(() => {
    if (
      searchQuery.searchQuery.searchValue !== '' &&
      searchQuery.searchQuery.searchMethod === 'name'
    ) {
      const searchByName = async () => {
        const fetchCardResults = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:"${searchQuery.searchQuery.searchValue}"`,
          {
            method: 'GET',
            // headers: {
            //   'X-Api-Key': '',
            // },
          }
        );

        const cardResultData = await fetchCardResults.json();
        setSingleCardSearchResults(cardResultData);

        const fetchSealedResults = await fetch(
          `https://api.pokemontcg.io/v2/sealed?q=name:"${searchQuery.searchQuery.searchValue}"`,
          {
            method: 'GET',
            // headers: {
            //   'X-Api-Key': '',
            // },
          }
        );

        const sealedResultData = await fetchSealedResults.json();
        setSealedProductSearchResults(sealedResultData);

        // Pokemon API data check
        console.log(cardResultData);
        console.log(sealedResultData);
      };

      searchByName();
    } else if (
      searchQuery.searchQuery.searchValue !== '' &&
      searchQuery.searchQuery.searchMethod === 'set'
    ) {
      const searchBySet = async () => {
        const fetchCardResults = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=set.id:"${searchQuery.searchQuery.searchValue}"`,
          {
            method: 'GET',
            // headers: {
            //   'X-Api-Key': '',
            // },
          }
        );

        const cardResultData = await fetchCardResults.json();
        setSingleCardSearchResults(cardResultData);

        const fetchSealedResults = await fetch(
          `https://api.pokemontcg.io/v2/sealed?q=set.id:"${searchQuery.searchQuery.searchValue}"`,
          {
            method: 'GET',
            // headers: {
            //   'X-Api-Key': '',
            // },
          }
        );

        const sealedResultData = await fetchSealedResults.json();
        setSealedProductSearchResults(sealedResultData);

        // Pokemon API data check
        console.log(cardResultData);
        console.log(sealedResultData);
      };

      searchBySet();
    } else return;
  }, []);

  return (
    <div className="SearchResultsPage">
      <Header color={'black'} background={'transparent'} />
      <div className="page-wrapper">
        <ReturnButton text={'Search'} link={'search'} />
        <div className="headline-wrapper">
          <h1>Search results for</h1>
          <h1 className="underlined">
            &quot;{searchQuery.searchQuery.searchDisplay}&quot;
          </h1>
        </div>
        <div className="results-info-wrapper">
          <p>
            <span className="bold">{singleCardSearchResults.count}</span>
            {'  '}Single Cards
          </p>
          <p>
            <span className="bold">{sealedProductSearchResults.count}</span>
            {'  '}Sealed Products
          </p>
        </div>
        <div className="results-wrapper">
          {singleCardSearchResults.count > 0 ? (
            <SingleCardsResults
              content={singleCardSearchResults}
              toggleSuccessModal={toggleSearchResultsSuccessModal}
            />
          ) : (
            <></>
          )}
          {sealedProductSearchResults.count > 0 ? (
            <SealedProductsResults
              content={sealedProductSearchResults}
              toggleSuccessModal={toggleSearchResultsSuccessModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {isSuccessModalOpen ? (
        <ErrorAndSuccessModal
          customClassName="floating-success-modal"
          easmText={successModalText}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchResultsPage;
