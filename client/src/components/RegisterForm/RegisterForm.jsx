import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './RegisterForm.scss';

const RegisterForm = ({
  onAddUsers,
  isValidEmail,
  isInvalidEmail,
  setIsInvalidEmail,
  isNotSamePassword,
  setisNotSamePassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return setIsInvalidEmail(true);
    }
    setIsInvalidEmail(false);

    if (password !== confirmPassword) {
      return setisNotSamePassword(!isNotSamePassword);
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

      if (!newUserData.ok) {
        // will insert suitable modal at the later stage
        console.log(response.message);
        navigate('/register');
      } else {
        // localStorage.setItem('user', JSON.stringify(response));
        // dispatch({ type: 'LOGIN', payload: response });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="RegisterForm">
      <form method="POST" onSubmit={handleSubmit} noValidate>
        <input
          className={`input ${isInvalidEmail ? 'invalid-border' : ''}`} // !!!
          type="email"
          placeholder="Email address"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`input ${isNotSamePassword ? 'invalid-border' : ''}`}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={`input ${isNotSamePassword ? 'invalid-border' : ''}`}
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
