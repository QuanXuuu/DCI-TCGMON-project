import { useState, useContext, useEffect } from 'react';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import SingleCardsResults from '../../components/SingleCardsResults/SingleCardsResults';
import SealedProductsResults from '../../components/SealedProductsResults/SealedProductsResults';
import './SearchResultsPage.scss';

const SearchResultsPage = () => {
  const searchQuery = useContext(SearchQueryContext);

  const [singleCardSearchResults, setSingleCardSearchResults] = useState({});
  const [sealedProductSearchResults, setSealedProductSearchResults] = useState(
    {}
  );

  useEffect(() => {
    if (searchQuery.searchQuery.searchMethod === 'name') {
      const searchByName = async () => {
        const fetchCardResults = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:"${searchQuery.searchQuery.searchTerm}"`,
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
          `https://api.pokemontcg.io/v2/sealed?q=name:"${searchQuery.searchQuery.searchTerm}"`,
          {
            method: 'GET',
            // headers: {
            //   'X-Api-Key': '',
            // },
          }
        );

        const sealedResultData = await fetchSealedResults.json();
        setSealedProductSearchResults(sealedResultData);

        console.log(cardResultData);
        console.log(sealedResultData);
      };

      searchByName();
    } else {
      const searchBySet = async () => {
        const fetchCardResults = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=set.name:"${searchQuery.searchQuery.searchTerm}"`,
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
          `https://api.pokemontcg.io/v2/sealed?q=set.name:"${searchQuery.searchQuery.searchTerm}"`,
          {
            method: 'GET',
            // headers: {
            //   'X-Api-Key': '',
            // },
          }
        );

        const sealedResultData = await fetchSealedResults.json();
        setSealedProductSearchResults(sealedResultData);

        // console.log for data visibility
        console.log(cardResultData);
        console.log(sealedResultData);
      };

      searchBySet();
    }
  }, []);

  return (
    <div className="SearchResultsPage">
      <Header color={'black'} />
      <div className="page-wrapper">
        <ReturnButton text={'Search'} />
        <div className="headline-wrapper">
          <h1>Search results for</h1>
          <h1 className="underlined">
            &quot;{searchQuery.searchQuery.searchTerm}&quot;
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
            <SingleCardsResults content={singleCardSearchResults} />
          ) : (
            <></>
          )}
          {sealedProductSearchResults.count > 0 ? (
            <SealedProductsResults content={sealedProductSearchResults} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
