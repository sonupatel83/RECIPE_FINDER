import { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required!');
      return;
    }

    if (isLogin) {
      // Validate against stored credentials
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');

      if (email === storedEmail && password === storedPassword) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        navigate('/home'); // Redirect to ActualHome
      } else {
        setErrorMessage('Invalid credentials!');
        setSuccessMessage('');
      }
    } else {
      // Save credentials for signup
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      setSuccessMessage('Signup successful! You can now log in.');
      setErrorMessage('');
      setIsLogin(true);
    }
  };

  return (
    <Container size="xs" mt="lg">
      <Title order={2}>{isLogin ? 'Log In' : 'Sign Up'}</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          mt="sm"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="sm"
        />
        {errorMessage && (
          <Text color="red" size="sm" mt="sm">
            {errorMessage}
          </Text>
        )}
        {successMessage && (
          <Text color="green" size="sm" mt="sm">
            {successMessage}
          </Text>
        )}
        <Button fullWidth mt="lg" onClick={handleFormSubmit}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </Button>
        <Text
          size="sm"
          mt="sm"
          style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }}
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMessage('');
            setSuccessMessage('');
          }}
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
        </Text>
      </form>
    </Container>
  );
};

export default AuthPage;
