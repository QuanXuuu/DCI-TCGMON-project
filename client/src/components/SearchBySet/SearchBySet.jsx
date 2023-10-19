import { useContext } from 'react';
import SearchQueryContext from '../../contexts/SearchQueryContext';
import Button from '../../components/Button/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './SearchBySet.scss';

const SearchBySet = ({ setlist }) => {
  const { setSearchQuery } = useContext(SearchQueryContext);
  //   const [isDropdownVisible, setDropdownVisible] = useState(false);

  //   const toggleDropdown = () => {
  //     setDropdownVisible(!isDropdownVisible);
  //   };

  return (
    // <div
    //   className={`SearchBySet ${isDropdownVisible ? 'dropdown-visible' : ''}`}
    // >
    //   <div className="SearchBySetDropdown">
    //     <div className="SearchBySetDropdownBox" onClick={toggleDropdown}>
    //       <p>
    //         Choose set
    //         <FontAwesomeIcon icon={faArrowDown} className="DropdownArrow" />
    //       </p>
    //     </div>
    //     {isDropdownVisible && (
    //       <div className="dropdown-content">
    //         <p className="SetName">Set 1</p>
    //         <p className="SetName">Set 2</p>
    //         <p className="SetName">Set 3</p>
    //         <p className="SetName">Set 4</p>
    //       </div>
    //     )}
    //   </div>
    //   <Button text={'Show results'} link={'results'} />
    // </div>
    <div className="SearchBySet">
      <select
        onChange={(e) => {
          setSearchQuery({
            searchTerm: e.target.value,
            searchMethod: 'set',
          });
        }}
        id="SetSelect"
        name="sets"
      >
        <option value="">Choose set</option>
        {setlist.data.map((result, index) => {
          return (
            <option key={index} value={result.name}>
              {result.name}
            </option>
          );
        })}
      </select>
      <Button text={'Show search results'} link={'results'} />
    </div>
  );
};

export default SearchBySet;
