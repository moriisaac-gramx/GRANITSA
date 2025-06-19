import React, { useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Box, Alert } from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const roles = [
  { label: 'generalManager', value: 'generalManager' },
  { label: 'Sales Representative', value: 'salesRep' },
  { label: 'Warehouse Staff', value: 'warehouseStaff' }
];

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const navigate = useNavigate();

  const isEmailValid = formData.email.endsWith('@granitsa.com');
  const isPasswordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      setAlertType('error');
      return setMessage('Email must end with "@granitsa.com"');
    }

    if (!isPasswordStrong) {
      setAlertType('error');
      return setMessage('Password must include upper, lower, number & special character (min 8 chars)');
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      setAlertType('success');
      setMessage('Account created successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setAlertType('error');
      setMessage(errorMsg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Create Your Granitsa Account
      </Typography>

      {message && (
        <Alert severity={alertType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth required label="Full Name" name="name" value={formData.name}
          onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth required label="Email (e.g. user@granitsa.com)" name="email" type="email"
          value={formData.email} onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth required label="Password" name="password" type="password"
          value={formData.password} onChange={handleChange} sx={{ mb: 2 }}
          helperText="Use at least 8 characters with uppercase, lowercase, number & symbol"
        />
        <TextField
          select required fullWidth label="Role" name="role" value={formData.role}
          onChange={handleChange} sx={{ mb: 3 }}
        >
          {roles.map((r) => (
            <MenuItem key={r.value} value={r.value}>
              {r.label}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#2e7d32' }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
