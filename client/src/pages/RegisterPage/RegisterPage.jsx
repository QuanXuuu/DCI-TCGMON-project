import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import LoginPageErrorModal from '../../components/LoginPageErrorModal/LoginPageErrorModal.jsx';
import './RegisterPage.scss';
import RegisterPageErrorModal from '../../components/RegisterPageErrorModal/RegisterPageErrorModal.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="RegisterPage">
      <Logo height={'80'} />
      <RegisterPageErrorModal />
      <div className="RegisterWelcomeContainer">
        <div>
          <h1>Welcome!</h1>
          <h2>Sign up now, it&apos;s free.</h2>
        </div>
        <RegisterForm />
      </div>
      <div className="RegisterPageButtonsWrapper">
        <Button text={'Create account'} link={'login'} />
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
