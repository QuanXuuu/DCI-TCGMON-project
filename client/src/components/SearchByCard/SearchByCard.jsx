import { useState, useEffect, useContext } from 'react';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import Button from '../../components/Button/Button';
import './SearchByCard.scss';

const SearchByCard = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    setSearchQuery({ searchDisplay: '', searchValue: '', searchMethod: '' });
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
            searchDisplay: e.target.value,
            searchValue: e.target.value,
            searchMethod: 'name',
          });
        }}
      />
      <Button text={'Show search results'} link={'results'} />
    </div>
  );
};

export default SearchByCard;
