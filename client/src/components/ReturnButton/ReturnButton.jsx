import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './ReturnButton.scss';

const ReturnButton = ({ text }) => {
  return (
    <>
      <button className="ReturnButton">
        <FontAwesomeIcon icon={faChevronLeft} className="return-button-icon" />
        Back to {text}
      </button>
    </>
  );
};

export default ReturnButton;
