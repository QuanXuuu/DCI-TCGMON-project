import { useState } from 'react';
import './RegisterForm.scss';

const RegisterForm = ({ onAddUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

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
          name="email"
          value={email}
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
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
        <button className="signup-button">Sign Up New User</button>
      </form>
    </div>
  );
};

export default RegisterForm;
