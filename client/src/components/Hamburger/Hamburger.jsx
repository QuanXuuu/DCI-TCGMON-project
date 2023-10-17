import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Hamburger.scss';

const Hamburger = ({ color }) => {
  return (
    <>
      <button className="Hamburger">
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger-icon"
          style={color === 'black' ? { color: 'rgba(0, 0, 0, 0.85)' } : ''}
        />
      </button>
    </>
  );
};

export default Hamburger;
