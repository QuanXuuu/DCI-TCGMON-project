import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SearchByCard from '../../components/SearchByCard/SearchByCard';
import SearchBySet from '../../components/SearchBySet/SearchBySet';
import './SearchPage.scss';

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sets, setSets] = useState();
  const [selectedOption, setSelectedOption] = useState('set');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user === null) {
      return navigate('/');
    }

    const getSetNames = async () => {
      const fetchSets = await fetch(`https://api.pokemontcg.io/v2/sets`, {
        method: 'GET',
        // headers: {
        //   'X-Api-Key': '',
        // },
      });

      const setData = await fetchSets.json();
      setSets(setData);
      setIsLoading(false);
    };

    getSetNames();
  }, []);

  return isLoading ? null : (
    <div className="SearchPage">
      <Header />
      <div className="SearchPageWrapper">
        <h1>Search</h1>
        <div className="SearchSwitchButtons">
          <button
            className={`SwitchButton ${
              selectedOption === 'set' ? 'active' : ''
            }`}
            onClick={() => setSelectedOption('set')}
          >
            Search by set
          </button>
          <button
            className={`SwitchButton ${
              selectedOption === 'card' ? 'active' : ''
            }`}
            onClick={() => setSelectedOption('card')}
          >
            Search by card
          </button>
        </div>
        {selectedOption === 'set' && <SearchBySet setlist={sets} />}
        {selectedOption === 'card' && <SearchByCard />}
      </div>
    </div>
  );
};

export default SearchPage;
