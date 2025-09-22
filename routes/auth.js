const express = require('express');
const { users } = require('../data/mockData');

const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('pages/login', { 
    title: 'Login',
    error: null,
    user: null
  });
});

// Login POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.render('pages/login', { 
      title: 'Login',
      error: 'Invalid email or password',
      user: null
    });
  }
});

// Sign up page
router.get('/signup', (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('pages/signup', { 
    title: 'Sign Up',
    error: null,
    user: null
  });
});

// Sign up POST
router.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  // Basic validation
  if (password !== confirmPassword) {
    return res.render('pages/signup', { 
      title: 'Sign Up',
      error: 'Passwords do not match',
      user: null
    });
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.render('pages/signup', { 
      title: 'Sign Up',
      error: 'User with this email already exists',
      user: null
    });
  }
  
  // Create new user (in real app, password would be hashed)
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name,
    role: 'student' // Default role
  };
  
  users.push(newUser);
  req.session.userId = newUser.id;
  res.redirect('/dashboard');
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;