import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../components/Logo/Logo.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal.jsx';
import {isValidEmail} from './emailValidation.js'
import './RegisterPage.scss';

const RegisterPage = ({isRegisterSuccess, setIsRegisterSuccess}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isNotSamePassword, setisNotSamePassword] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isEmailInUse, setIsEmailInUse] = useState(false);

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
        <RegisterForm onAddUsers={handleAddUsers} isValidEmail={isValidEmail} isInvalidEmail={isInvalidEmail} setIsInvalidEmail={setIsInvalidEmail} isNotSamePassword={isNotSamePassword} setisNotSamePassword={setisNotSamePassword} isEmailInUse={isEmailInUse} setIsEmailInUse={setIsEmailInUse} isRegisterSuccess={isRegisterSuccess} setIsRegisterSuccess={setIsRegisterSuccess}/>
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
      {isNotSamePassword && (
        <ErrorAndSuccessModal
        customClassName="rp-lp-error-style"
        easmText={'Please enter the same password again'}
      />
      )}
      {isEmailInUse && (
        <ErrorAndSuccessModal
        customClassName="rp-lp-error-style"
        easmText={'Email already in use'}
      />
      )}
    </div>
  );
};

export default RegisterPage;
