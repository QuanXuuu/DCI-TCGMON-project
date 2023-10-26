import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import Button from '../../components/Button/Button.jsx';

import LoginPageErrorModal from '../../components/LoginPageErrorModal/LoginPageErrorModal.jsx';

import './LoginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginPage">
      <Logo height={'80'} />

      <LoginPageErrorModal />

      <div className="LoginTextAndFormBox">
        <div>
          <h1>Welcome back!</h1>
        </div>

        <LoginForm />
        <div className="LoginFormContainer">
          <button className="ForgotPasswordButton">
            Forgot your password?
          </button>
        </div>
      </div>
      <div className="LoginAndRegisterContainer">
        <Button text={'Login'} link={'collections'} />
        <button
          className="LoginPageRegisterButton"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
