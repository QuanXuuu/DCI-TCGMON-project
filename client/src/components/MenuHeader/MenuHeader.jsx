import Logo from '../Logo/Logo';
import CloseButton from '../CloseButton/CloseButton';
import './MenuHeader.scss';

const MenuHeader = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div className="MenuHeader">
      {/* <Logo height={'40'} /> */}
      <div className="close-button-wrapper">
        <CloseButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default MenuHeader;
