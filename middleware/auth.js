const { users } = require('../data/mockData');

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    const user = users.find(u => u.id === req.session.userId);
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.redirect('/auth/login');
};

// Role-based authorization middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/auth/login');
    }
    
    if (roles.includes(req.user.role)) {
      return next();
    }
    
    res.status(403).render('pages/error', { 
      title: 'Access Denied',
      message: 'You do not have permission to access this page.',
      user: req.user
    });
  };
};

// Check if user is authenticated (for conditional rendering)
const checkAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    const user = users.find(u => u.id === req.session.userId);
    if (user) {
      req.user = user;
    }
  }
  next();
};

module.exports = {
  requireAuth,
  requireRole,
  checkAuth
};