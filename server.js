const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const { checkAuth } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: 'online-course-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Global middleware to check authentication
app.use(checkAuth);

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/admin', adminRoutes);

// Home route
app.get('/', (req, res) => {
  const { courses } = require('./data/mockData');
  const featuredCourses = courses.filter(course => course.featured);
  
  res.render('pages/home', { 
    title: 'Online Course Platform',
    user: req.user,
    courses,
    featuredCourses
  });
});

// Error handling
app.use((req, res) => {
  res.status(404).render('pages/error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});