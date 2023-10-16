import logo from '../../assets/images/pokemon-logo.svg';
import './Logo.scss';

const Logo = ({ height }) => {
  return (
    <div className="Logo">
      <img src={logo} style={{ height: `${height}px` }} />
    </div>
  );
};

export default Logo;
