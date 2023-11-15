import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './CollectionSummaryPlaceholder.scss';

const CollectionSummaryPlaceholder = ({ toggleAddCollectionModal }) => {
  return (
    <div className="CollectionSummaryPlaceholder">
      <h2>Create your first collection now!</h2>
      <button className="placeholder-button" onClick={toggleAddCollectionModal}>
        <FontAwesomeIcon icon={faPlus} className="placeholder-button-icon" />
      </button>
    </div>
  );
};

export default CollectionSummaryPlaceholder;
