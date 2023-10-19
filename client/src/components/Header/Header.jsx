import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';
import Menu from '../Menu/Menu';
import './Header.scss';

const Header = ({ color, background }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
    
  const toggleMenu = () => {                          
  setIsMenuOpen(!isMenuOpen);                       
  }; 

  useEffect(() => { 
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <div className={`Header ${isMenuOpen ? 'hidden' : ''}`} style={background === 'transparent' ? { background: 'rgba(0, 0, 0, 0.2)' } : { background: 'rgba(35, 35, 35, 0.850)' }}>
      <Logo height={'40'} />
      <Hamburger color={color} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {isMenuOpen && <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
    </div>
  );
};

export default Header;
