const express = require('express');
const { courses, users } = require('../data/mockData');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin or owner role
router.use(requireAuth);
router.use(requireRole('admin', 'owner'));

// Course management page
router.get('/courses', (req, res) => {
  res.render('pages/admin-courses', {
    title: 'Manage Courses',
    user: req.user,
    courses
  });
});

// Add course page
router.get('/courses/add', (req, res) => {
  res.render('pages/course-form', {
    title: 'Add New Course',
    user: req.user,
    course: null,
    isEdit: false
  });
});

// Add course POST
router.post('/courses/add', (req, res) => {
  const { title, description, category, difficulty, price } = req.body;
  
  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    category,
    difficulty,
    price: parseFloat(price) || 0,
    instructor: req.user.name,
    duration: '4 weeks', // Default values
    lessons: 10,
    students: 0,
    rating: 0,
    image: '/images/default-course.jpg',
    featured: false,
    syllabus: ['Introduction', 'Basic Concepts', 'Advanced Topics', 'Final Project'],
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  };
  
  courses.push(newCourse);
  res.redirect('/admin/courses');
});

// Edit course page
router.get('/courses/:id/edit', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).render('pages/error', {
      title: 'Course Not Found',
      message: 'The course you are trying to edit does not exist.',
      user: req.user
    });
  }
  
  res.render('pages/course-form', {
    title: 'Edit Course',
    user: req.user,
    course,
    isEdit: true
  });
});

// Edit course POST
router.post('/courses/:id/edit', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === courseId);
  
  if (courseIndex === -1) {
    return res.status(404).render('pages/error', {
      title: 'Course Not Found',
      message: 'The course you are trying to edit does not exist.',
      user: req.user
    });
  }
  
  const { title, description, category, difficulty, price } = req.body;
  
  // Update course
  courses[courseIndex] = {
    ...courses[courseIndex],
    title,
    description,
    category,
    difficulty,
    price: parseFloat(price) || 0
  };
  
  res.redirect('/admin/courses');
});

// Delete course
router.post('/courses/:id/delete', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === courseId);
  
  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }
  
  courses.splice(courseIndex, 1);
  res.json({ success: true, message: 'Course deleted successfully' });
});

// User management (owner only)
router.get('/users', requireRole('owner'), (req, res) => {
  const admins = users.filter(u => u.role === 'admin');
  const students = users.filter(u => u.role === 'student');
  
  res.render('pages/admin-users', {
    title: 'Manage Users',
    user: req.user,
    admins,
    students
  });
});

module.exports = router;