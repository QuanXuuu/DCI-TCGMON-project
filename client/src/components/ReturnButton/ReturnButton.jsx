import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './ReturnButton.scss';

const ReturnButton = ({ text, link }) => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(`/${link}`)} className="ReturnButton">
        <FontAwesomeIcon icon={faChevronLeft} className="return-button-icon" />
        Back to {text}
      </button>
    </>
  );
};

export default ReturnButton;
