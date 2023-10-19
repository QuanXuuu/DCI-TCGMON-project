import MenuHeader from '../MenuHeader/MenuHeader';
import './Menu.scss';

const Menu = ({isMenuOpen, toggleMenu}) => {
  return (
    <div className='Menu'>
        <div className='MenuContent'>
                <MenuHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className='MenuOptions'>
                    <p>My Collections</p> 
                    <p>Search</p>
                    <p>Log out</p>
                </div>
                <footer>
                    <p>Impressum</p>
                    <p>Datenschutzerklärung</p>
                    <p>&#169; 2023 TCGMON</p>
                </footer>
        </div>
    </div>
  );
};

export default Menu;
