const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const { auth, isAdmin } = require('../middleware/auth');

router.get('/', auth, coursesController.getAllCourses);
router.get('/:id', auth, coursesController.getCourseById);
router.post('/', auth, isAdmin, coursesController.createCourse);
router.put('/:id', auth, isAdmin, coursesController.updateCourse);
router.delete('/:id', auth, isAdmin, coursesController.deleteCourse);

module.exports = router; 