import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

const api = axios.create({
  baseURL: '/api/courses',
});

function Courses({ role, onLogout }) {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', duration: '', price: '' });

  const fetchCourses = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/', { headers: { Authorization: `Bearer ${token}` } });
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpen = (course = null) => {
    setEditCourse(course);
    setForm(course ? { ...course } : { title: '', description: '', duration: '', price: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditCourse(null);
    setForm({ title: '', description: '', duration: '', price: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.duration || !form.price) {
      alert('Заполните все поля');
      return;
    }
    const token = localStorage.getItem('token');
    if (editCourse) {
      await api.put(`/${editCourse.id}`, {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
      }, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await api.post('/', {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
      }, { headers: { Authorization: `Bearer ${token}` } });
    }
    fetchCourses();
    handleClose();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await api.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchCourses();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Курсы</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button onClick={onLogout} variant="outlined">Выйти</Button>
        {role === 'admin' && (
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>Добавить курс</Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Длительность (ч)</TableCell>
              <TableCell>Цена</TableCell>
              {role === 'admin' && <TableCell align="right">Действия</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.price}</TableCell>
                {role === 'admin' && (
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpen(course)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(course.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editCourse ? 'Редактировать курс' : 'Добавить курс'}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Название"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Описание"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Длительность (ч)"
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Цена"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogin = () => {
    setIsAuth(true);
    setRole(localStorage.getItem('role'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuth(false);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/courses"
          element={isAuth ? <Courses role={role} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isAuth ? "/courses" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
