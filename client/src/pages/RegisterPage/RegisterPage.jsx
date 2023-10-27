import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../components/Logo/Logo.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import './RegisterPage.scss';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  function handleAddUsers(user) {
    setUsers((users) => [...users, user]);
  }

  return (
    <div className="RegisterPage">
      <Logo height={'80'} />
      <div className="RegisterWelcomeContainer">
        <div>
          <h1>Welcome!</h1>
          <h2>Sign up now, it&apos;s free.</h2>
        </div>
        <RegisterForm onAddUsers={handleAddUsers} />
      </div>
      <div className="RegisterPageButtonsWrapper">
        <button
          className="RegisterPageLoginButton"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
