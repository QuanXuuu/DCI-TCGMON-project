import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';
import './Header.scss';

const Header = ({ color }) => {
  return (
    <div className="Header">
      <Logo height={'40'} />
      <Hamburger color={color} />
    </div>
  );
};

export default Header;
