import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/auth/register', form);
      setSuccess('Регистрация успешна! Теперь войдите.');
      onRegister && onRegister();
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>Регистрация</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Зарегистрироваться</Button>
      </form>
      <Box mt={2} textAlign="center">
        <MuiLink component={Link} to="/login">
          Уже есть аккаунт? Войти
        </MuiLink>
      </Box>
    </Box>
  );
} 