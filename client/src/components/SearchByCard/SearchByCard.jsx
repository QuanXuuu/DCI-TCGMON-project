import { useState, useEffect, useContext } from 'react';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import Button from '../../components/Button/Button';
import './SearchByCard.scss';

const SearchByCard = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    setSearchQuery({ searchTerm: '', searchMethod: '' });
  }, [setSearchQuery]);

  return (
    <div className="SearchByCard">
      <div className="SearchByCardForm">
        <form action="">
          <input
            type="text"
            value={inputValue}
            placeholder="Card name"
            onChange={(e) => {
              setInputValue(e.target.value);
              setSearchQuery({
                searchTerm: e.target.value,
                searchMethod: 'name',
              });
            }}
          />
        </form>
      </div>
      <Button text={'Show results'} link={'results'} />
    </div>
  );
};

export default SearchByCard;
