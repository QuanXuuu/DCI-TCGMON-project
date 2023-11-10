import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.scss';

const RegisterForm = ({ onAddUsers, isValidEmail, isInvalidEmail, setIsInvalidEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    if (password !== confirmPassword) {
      return console.log('Please enter the same password again.');
    }

    if (!isValidEmail(email)) {  // !!!!
      setIsInvalidEmail(true);
      return;
    }

  setIsInvalidEmail(false);

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
      <form action="" method="POST" onSubmit={handleSubmit} noValidate>
        <input
          className={`input ${isInvalidEmail ? 'invalid-email' : ''}`} // !!! 
          type="email"
          name="email"
          value={email}
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='input'
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className='input'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterForm;
