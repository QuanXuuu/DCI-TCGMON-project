import { useNavigate } from 'react-router-dom';
import MenuHeader from '../MenuHeader/MenuHeader';
import './Menu.scss';

const Menu = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="Menu">
      <div className="MenuContent">
        <MenuHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="MenuOptions">
          <button onClick={() => navigate('/collections')}>   Collections
          </button>
          <button onClick={() => navigate('/search')}>Search</button>
          <button onClick={() => navigate('/login')}>Log out</button>
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
