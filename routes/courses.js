const express = require('express');
const { courses, enrollments } = require('../data/mockData');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Browse courses page
router.get('/', (req, res) => {
  const { search, category, difficulty, price } = req.query;
  let filteredCourses = [...courses];
  
  // Apply filters
  if (search) {
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (category && category !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.category === category);
  }
  
  if (difficulty && difficulty !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
  }
  
  if (price && price !== 'all') {
    if (price === 'free') {
      filteredCourses = filteredCourses.filter(course => course.price === 0);
    } else if (price === 'paid') {
      filteredCourses = filteredCourses.filter(course => course.price > 0);
    }
  }
  
  // Get unique categories and difficulties for filters
  const categories = [...new Set(courses.map(course => course.category))];
  const difficulties = [...new Set(courses.map(course => course.difficulty))];
  
  res.render('pages/courses', {
    title: 'Browse Courses',
    courses: filteredCourses,
    categories,
    difficulties,
    filters: { search, category, difficulty, price },
    user: req.user
  });
});

// Course detail page
router.get('/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).render('pages/error', {
      title: 'Course Not Found',
      message: 'The course you are looking for does not exist.',
      user: req.user
    });
  }
  
  // Check if user is enrolled
  let isEnrolled = false;
  if (req.user) {
    isEnrolled = enrollments.some(e => e.userId === req.user.id && e.courseId === courseId);
  }
  
  res.render('pages/course-detail', {
    title: course.title,
    course,
    isEnrolled,
    user: req.user
  });
});

// Enroll in course
router.post('/:id/enroll', requireAuth, (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  
  // Check if course is free
  if (course.price > 0) {
    return res.status(400).json({ error: 'This course requires payment' });
  }
  
  // Check if already enrolled
  const existingEnrollment = enrollments.find(e => 
    e.userId === req.user.id && e.courseId === courseId
  );
  
  if (existingEnrollment) {
    return res.status(400).json({ error: 'Already enrolled in this course' });
  }
  
  // Add enrollment
  enrollments.push({
    userId: req.user.id,
    courseId: courseId,
    enrolledAt: new Date()
  });
  
  res.json({ success: true, message: 'Successfully enrolled in course' });
});

module.exports = router;