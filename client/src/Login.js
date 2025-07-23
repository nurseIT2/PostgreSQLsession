import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      onLogin();
      navigate('/courses');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка входа');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>Вход</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя пользователя"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Войти</Button>
      </form>
      <Box mt={2} textAlign="center">
        <MuiLink component={Link} to="/register">
          Нет аккаунта? Зарегистрироваться
        </MuiLink>
      </Box>
    </Box>
  );
} 