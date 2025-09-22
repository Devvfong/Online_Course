# CourseHub - Online Course Platform

A complete modular online course website for the IT field with multiple account roles and comprehensive features.

![Homepage](https://github.com/user-attachments/assets/e43b577f-022e-4ab0-a0c3-f90db98b6d4e)

## Features

### 🔐 Authentication System
- **Sign up, Login, Logout** with session management
- **Role-based access control** (Owner, Admin, Student)
- **Demo accounts** for testing all features

### 👥 Account Roles

#### Owner (Super Admin)
- Full platform access and control
- Manage admins and view all users
- Access platform-wide settings and analytics
- View comprehensive dashboard with system metrics

![Admin Dashboard](https://github.com/user-attachments/assets/c461a56c-e46e-4e54-8d22-63f8b32e1864)

#### Admin
- Manage courses (add, edit, delete)
- View platform statistics (courses, students, enrollments)
- Cannot manage other admins or access owner features
- Dedicated admin dashboard with course management tools

#### Student
- Browse and search courses
- Enroll in free courses
- View personal learning dashboard
- Track progress and enrolled courses

![Student Dashboard](https://github.com/user-attachments/assets/779e05eb-28f9-4f39-9bac-dbb9aae50587)

### 📚 Course Management
- **Complete CRUD operations** for courses
- Course attributes: title, description, category, difficulty, price
- **Mock video lessons** and syllabus
- **Instructor assignments** (auto-filled with admin name)

### 🔍 Course Browsing
- **Homepage with featured courses**
- **Advanced search and filtering** by category, price, difficulty
- **Course detail pages** with syllabus and preview
- **Responsive course cards** with ratings and student counts

### 📊 Role-Specific Dashboards
- **Student Dashboard**: enrolled courses, progress tracking, recommendations
- **Admin Dashboard**: course management, platform statistics, recent activity
- **Owner Dashboard**: complete platform control, user management, system analytics

### 💰 Enrollment System
- **Free course enrollment** with instant access
- **Paid courses** show "Purchase Required" (payment integration placeholder)
- **Enrollment tracking** and course progress

### 🎨 Modern UI & Design
- **Responsive design** using Tailwind CSS
- **Clean, professional interface**
- **Reusable components** (buttons, cards, navigation)
- **Consistent branding** and user experience

## Demo Accounts

Use these accounts to test different role functionalities:

- **Owner**: `owner@example.com` / `owner123`
- **Admin**: `admin@example.com` / `admin123`  
- **Student**: `student@example.com` / `student123`

## Technology Stack

- **Backend**: Node.js + Express.js
- **Frontend**: EJS templating engine
- **Styling**: Tailwind CSS
- **Session Management**: express-session
- **Architecture**: Modular MVC pattern

## Project Structure

```
Online_Course/
├── data/
│   └── mockData.js          # Mock database with courses, users, enrollments
├── middleware/
│   └── auth.js              # Authentication and authorization middleware
├── routes/
│   ├── auth.js              # Authentication routes (login, signup, logout)
│   ├── courses.js           # Course browsing and enrollment routes
│   ├── dashboard.js         # Role-specific dashboard routes
│   └── admin.js             # Admin/owner management routes
├── views/
│   ├── layouts/
│   │   └── layout.ejs       # Main layout template
│   └── pages/
│       ├── home.ejs         # Homepage with featured courses
│       ├── login.ejs        # Login page
│       ├── signup.ejs       # Registration page
│       ├── courses.ejs      # Course browsing page
│       ├── course-detail.ejs # Individual course page
│       ├── dashboard-*.ejs  # Role-specific dashboards
│       ├── admin-*.ejs      # Admin management pages
│       ├── course-form.ejs  # Add/edit course form
│       └── error.ejs        # Error page
├── public/
│   ├── css/
│   │   ├── input.css        # Tailwind CSS input
│   │   └── style.css        # Compiled CSS
│   └── js/
│       └── main.js          # Client-side JavaScript
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── tailwind.config.js       # Tailwind configuration
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Online_Course
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS**
   ```bash
   npm run build-css
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Development

- **Start development server**: `npm run dev` (with nodemon)
- **Build CSS in watch mode**: `npm run build`
- **Build CSS once**: `npm run build-css`

## Features Ready for Database Integration

The application is designed with modularity in mind and ready for database integration:

- **Mock data structure** mirrors typical database schemas
- **Placeholder functions** for all CRUD operations
- **Separation of concerns** with dedicated data layer
- **Session-based authentication** ready for user management
- **Modular route handlers** for easy API conversion

## Future Enhancements

- Payment integration for paid courses
- Video streaming and lesson management
- Assignment and quiz system
- Certificate generation
- Discussion forums
- Email notifications
- Advanced analytics and reporting

## License

MIT License - feel free to use this project as a foundation for your own online course platform.