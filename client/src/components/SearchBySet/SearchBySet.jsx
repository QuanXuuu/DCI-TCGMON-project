import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import './SearchBySet.scss';

const SearchBySet = ({ setlist }) => {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    setSearchQuery({ searchValue: '', searchMethod: '' });
  }, [setSearchQuery]);

  return (
    <div className="SearchBySet">
      <div className="SelectWrapper">
        <select
          onChange={(e) => {
            setSearchQuery({
              searchValue: e.target.value,
              searchMethod: 'set',
            });
          }}
          id="SetSelect"
          name="sets"
        >
          <option value="">-- Choose set --</option>
          {setlist.data
            .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
            .map((result, index) => {
              return (
                <option key={index} value={result.id}>
                  {result.name}
                </option>
              );
            })}
        </select>
      </div>
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

export default SearchBySet;
