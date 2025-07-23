const pool = require('../database');

exports.getAllCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, duration, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (title, description, duration, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, duration, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE courses SET title = $1, description = $2, duration = $3, price = $4 WHERE id = $5 RETURNING *',
      [title, description, duration, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.json({ message: 'Курс удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 