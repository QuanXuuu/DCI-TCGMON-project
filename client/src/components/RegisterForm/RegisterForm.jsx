import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './RegisterForm.scss';

const RegisterForm = ({ onAddUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    if (password !== confirmPassword) return;

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
      console.log('newUserData:', response);

      dispatch({ type: 'LOGIN', payload: response });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="RegisterForm">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <input
          className="RegisterFormInputOne"
          type="email"
          placeholder="Email address"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
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
