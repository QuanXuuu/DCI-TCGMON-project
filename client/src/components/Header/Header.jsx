import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';
import './Header.scss';

const Header = () => {
  return (
    <div className="Header">
      <Logo height={'40'} />
      <Hamburger />
    </div>
  );
};

export default Header;
