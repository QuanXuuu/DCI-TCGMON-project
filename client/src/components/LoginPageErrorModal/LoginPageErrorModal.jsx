import './LoginPageErrorModal.scss';

const LoginPageErrorModal = () => {
  return (
    <div className="LoginPageErrorModal">
      <div className="Error-TextContainer">
          <p className="Error-Text">Wrong username and/or password</p>
      </div>
    </div>
  );
};

export default LoginPageErrorModal;
