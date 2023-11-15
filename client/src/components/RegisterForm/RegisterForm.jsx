import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.scss';

const RegisterForm = ({
  onAddUsers,
  isValidEmail,
  isInvalidEmail,
  setIsInvalidEmail,
  isNotSamePassword,
  setIsNotSamePassword,
  isEmailInUse,
  setIsEmailInUse,
  isRegisterSuccess,
  setIsRegisterSuccess,
  isAllRegisterFieldsFilled,
  setIsAllRegisterFieldsFilled,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password && !confirmPassword) {
      console.log('All fields must be filled');
      return setIsAllRegisterFieldsFilled(true);
    }

    if (!password || !confirmPassword) {
      console.log('All fields must be filled');
      return setIsAllRegisterFieldsFilled(true);
    }

    if (!email) {
      console.log('All fields must be filled');
      return setIsAllRegisterFieldsFilled(true);
    }

    if (password !== confirmPassword) {
      console.log('Please enter the same password');
      return setIsNotSamePassword(true);
    }

    if (!isValidEmail(email)) {
      return setIsInvalidEmail(true);
    }

    try {
      const newUser = { email, password };
      onAddUsers(newUser);

      const newUserData = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const response = await newUserData.json();
      console.log(newUserData);

      if (newUserData.status === 400) {
        setIsEmailInUse(!isEmailInUse);
        console.log(response.message);
        navigate('/register');
      } else {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
        setIsRegisterSuccess(!isRegisterSuccess);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="RegisterForm">
      <form method="POST" onSubmit={handleSubmit} noValidate>
        <input
          className={`input ${
            isInvalidEmail || isEmailInUse || isAllRegisterFieldsFilled
              ? 'invalid-border'
              : ''
          }`}
          type="email"
          placeholder="Email address"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`input ${
            isNotSamePassword || isAllRegisterFieldsFilled
              ? 'invalid-border'
              : ''
          }`}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={`input ${
            isNotSamePassword || isAllRegisterFieldsFilled
              ? 'invalid-border'
              : ''
          }`}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signup-button">Create account</button>
      </form>
    </div>
  );
};

export default RegisterForm;
