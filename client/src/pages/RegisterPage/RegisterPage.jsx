import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../components/Logo/Logo.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal.jsx';
import {isValidEmail} from '../../emailValidation.js'
import './RegisterPage.scss';
// import RegisterPageErrorModal from '../../components/RegisterPageErrorModal/RegisterPageErrorModal.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  function handleAddUsers(user) {
    setUsers((users) => [...users, user]);
  }

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  return (
    <div className="RegisterPage">
      <Logo height={'80'} />
      {/* <RegisterPageErrorModal /> */}
      <div className="RegisterWelcomeContainer">
        <div>
          <h1>Welcome!</h1>
          <h2>Sign up now, it&apos;s free.</h2>
        </div>
        <RegisterForm onAddUsers={handleAddUsers} isValidEmail={isValidEmail} isInvalidEmail={isInvalidEmail} setIsInvalidEmail={setIsInvalidEmail} />
      </div>
      <div className="RegisterPageButtonsWrapper">
        <button
          className="RegisterPageLoginButton"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
      {isInvalidEmail && (
        <ErrorAndSuccessModal
        customClassName="rp-lp-error-style"
        easmText={'Invalid email address'}
      />
)}
    </div>
  );
};

export default RegisterPage;
