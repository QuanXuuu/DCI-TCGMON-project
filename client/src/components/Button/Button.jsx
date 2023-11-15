import { useNavigate } from 'react-router-dom';
import './Button.scss';

const Button = ({ text, uppercase = false, link }) => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(`/${link}`)} className="Button">
        {uppercase ? text.toUpperCase() : text}
      </button>
    </>
  );
};

export default Button;
