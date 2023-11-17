import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserDataContext from '../../contexts/UserDataContext';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import Header from '../../components/Header/Header';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import SingleCardsResults from '../../components/SingleCardsResults/SingleCardsResults';
import SealedProductsResults from '../../components/SealedProductsResults/SealedProductsResults';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal';
import './SearchResultsPage.scss';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { userData, setUserData } = useContext(UserDataContext);
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
    const user = JSON.parse(localStorage.getItem('user'));

    if (user === null) return navigate('/');

    if (!userData) {
      const fetchUserData = async () => {
        const response = await fetch(`/api/user/${user.data.user.email}`, {
          method: 'GET',
        });
        const userData = await response.json();
        setUserData(userData);
      };
      fetchUserData();
    }

    if (Object.keys(searchQuery.searchQuery).length === 0) {
      const generateSearchQuery = () => {
        const regex = /q=([^&]+)&m=([^&]+)&d=([^&]+)/;
        const match = regex.exec(params.id);

        if (match) {
          const query = match[1];
          const method = match[2];
          const display = match[3];

          searchQuery.setSearchQuery({
            searchValue: query,
            searchMethod: method,
            searchDisplay: display,
          });
        }
      };
      generateSearchQuery();
    }

    if (
      Object.keys(searchQuery.searchQuery).length !== 0 &&
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
      };

      searchByName();
    } else if (
      Object.keys(searchQuery.searchQuery).length !== 0 &&
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
      };

      searchBySet();
    } else return;
  }, [searchQuery.searchQuery]);

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
          customClassName="success-modal"
          easmText={successModalText}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchResultsPage;
