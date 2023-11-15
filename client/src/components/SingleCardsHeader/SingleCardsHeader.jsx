import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import './SingleCardsHeader.scss';

const SingleCardsHeader = () => {
  return (
    <div className="SingleCardsHeader">
      <button className="options-button">
        <FontAwesomeIcon icon={faSort} className="options-button-icon" />
      </button>
      <h1>Single cards</h1>
      <button className="options-button">
        <FontAwesomeIcon icon={faFilter} className="options-button-icon" />
      </button>
    </div>
  );
};

export default SingleCardsHeader;
