import Logo from '../Logo/Logo';
import CloseButton from '../CloseButton/CloseButton';
import './MenuHeader.scss';

const MenuHeader = ({isMenuOpen, toggleMenu}) => {
  return (
    <div className="MenuHeader">
      <Logo height={'40'} />
      <CloseButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
    </div>
  );
};

export default MenuHeader;