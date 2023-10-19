import { useEffect, useContext } from 'react';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import Button from '../../components/Button/Button';
import './SearchBySet.scss';

const SearchBySet = ({ setlist }) => {
  const { setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    setSearchQuery({ searchDisplay: '', searchValue: '', searchMethod: '' });
  }, [setSearchQuery]);

  return (
    <div className="SearchBySet">
      <div className="SelectWrapper">
        <select
          onChange={(e) => {
            setSearchQuery({
              searchDisplay: e.target.options[e.target.selectedIndex].text,
              searchValue: e.target.value,
              searchMethod: 'set',
            });
          }}
          id="SetSelect"
          name="sets"
        >
          <option value="">-- Choose set --</option>
          {setlist.data.map((result, index) => {
            return (
              <option key={index} value={result.id}>
                {result.name}
              </option>
            );
          })}
        </select>
      </div>
      <Button text={'Show search results'} link={'results'} />
    </div>
  );
};

export default SearchBySet;
