const express = require('express');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/courses', coursesRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 