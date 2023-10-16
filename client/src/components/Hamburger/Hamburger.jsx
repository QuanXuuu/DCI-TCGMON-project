import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Hamburger.scss';

const Hamburger = () => {
  return (
    <>
      <button className="Hamburger">
        <FontAwesomeIcon icon={faBars} className="Hamburger-icon" />
      </button>
    </>
  );
};

export default Hamburger;
