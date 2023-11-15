import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import './SearchByCard.scss';

const SearchByCard = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    setSearchQuery({ searchValue: '', searchMethod: '' });
  }, [setSearchQuery]);

  return (
    <div className="SearchByCard">
      <input
        className="SearchByCardInput"
        type="text"
        value={inputValue}
        placeholder="Card/product name"
        onChange={(e) => {
          setInputValue(e.target.value);
          setSearchQuery({
            searchValue: e.target.value,
            searchMethod: 'name',
          });
        }}
      />
      <button
        onClick={() =>
          searchQuery.searchValue === ''
            ? null
            : navigate(
                `/results/q=${searchQuery.searchValue}&m=${searchQuery.searchMethod}`
              )
        }
        className="Button"
      >
        Show search results
      </button>
    </div>
  );
};

export default SearchByCard;
