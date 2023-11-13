import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import MenuHeader from '../MenuHeader/MenuHeader';
import './Menu.scss';

const Menu = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="Menu">
      <div className="MenuContent">
        <MenuHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="MenuOptions">
          <button onClick={() => navigate('/collections')}> Collections</button>
          <button onClick={() => navigate('/search')}>Search</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
        <footer>
          {/* <button onClick={() => navigate('/')}>Impressum</button>
          <button onClick={() => navigate('/')}>Datenschutzerklärung</button> */}
          <p>&#169; 2023 TCGMON</p>
        </footer>
      </div>
    </div>
  );
};

export default Menu;
