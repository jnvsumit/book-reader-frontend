import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [registrationToken, setRegistrationToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('/api/auth/register', {
        username,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Registration-Token': registrationToken
        }
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Role"
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled
        />
        <TextField
          label="Registration Token"
          variant="outlined"
          value={registrationToken}
          onChange={(e) => setRegistrationToken(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
