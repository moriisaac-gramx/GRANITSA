import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import axios from '../api/axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log("🔁 Login response:", res.data);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'generalManager') navigate('/dashboard/gm');
      else if (user.role === 'salesRep') navigate('/dashboard/sales');
      else if (user.role === 'warehouseStaff') navigate('/dashboard/warehouse');
      else navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setAlertType('error');
      setMessage(errorMsg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Welcome Back to Granitsa
      </Typography>

      {message && (
        <Alert severity={alertType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth required label="Email" name="email"
          value={formData.email} onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth required label="Password" name="password" type="password"
          value={formData.password} onChange={handleChange} sx={{ mb: 2 }}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#2e7d32', mb: 2 }}>
          Login
        </Button>

        <Typography align="center" variant="body2">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
