const express = require('express');
const { users, courses, enrollments } = require('../data/mockData');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Dashboard route - role-based redirection
router.get('/', requireAuth, (req, res) => {
  switch (req.user.role) {
    case 'owner':
      return res.redirect('/dashboard/owner');
    case 'admin':
      return res.redirect('/dashboard/admin');
    case 'student':
      return res.redirect('/dashboard/student');
    default:
      return res.redirect('/');
  }
});

// Student dashboard
router.get('/student', requireAuth, (req, res) => {
  if (req.user.role !== 'student') {
    return res.redirect('/dashboard');
  }
  
  // Get enrolled courses
  const userEnrollments = enrollments.filter(e => e.userId === req.user.id);
  const enrolledCourses = userEnrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId);
    return {
      ...course,
      enrolledAt: enrollment.enrolledAt
    };
  });
  
  res.render('pages/dashboard-student', {
    title: 'Student Dashboard',
    user: req.user,
    enrolledCourses,
    totalEnrolled: enrolledCourses.length
  });
});

// Admin dashboard
router.get('/admin', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.redirect('/dashboard');
  }
  
  const totalCourses = courses.length;
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalEnrollments = enrollments.length;
  
  res.render('pages/dashboard-admin', {
    title: 'Admin Dashboard',
    user: req.user,
    courses,
    totalCourses,
    totalStudents,
    totalEnrollments
  });
});

// Owner dashboard
router.get('/owner', requireAuth, (req, res) => {
  if (req.user.role !== 'owner') {
    return res.redirect('/dashboard');
  }
  
  const totalCourses = courses.length;
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalEnrollments = enrollments.length;
  const admins = users.filter(u => u.role === 'admin');
  
  res.render('pages/dashboard-owner', {
    title: 'Owner Dashboard',
    user: req.user,
    courses,
    admins,
    totalCourses,
    totalStudents,
    totalAdmins,
    totalEnrollments
  });
});

module.exports = router;