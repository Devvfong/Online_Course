// Mock data for users
const users = [
  {
    id: 1,
    email: 'owner@example.com',
    password: 'owner123', // In real app, this would be hashed
    name: 'John Owner',
    role: 'owner'
  },
  {
    id: 2,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Jane Admin',
    role: 'admin'
  },
  {
    id: 3,
    email: 'student@example.com',
    password: 'student123',
    name: 'Bob Student',
    role: 'student'
  },
  {
    id: 4,
    email: 'alice@example.com',
    password: 'student123',
    name: 'Alice Johnson',
    role: 'student'
  }
];

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming language',
    category: 'Programming',
    difficulty: 'Beginner',
    price: 0,
    instructor: 'Jane Admin',
    duration: '4 weeks',
    lessons: 12,
    students: 150,
    rating: 4.5,
    image: '/images/javascript-course.jpg',
    featured: true,
    syllabus: [
      'Variables and Data Types',
      'Functions and Scope',
      'DOM Manipulation',
      'Events and Event Handling',
      'Async JavaScript'
    ],
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis and machine learning',
    category: 'Data Science',
    difficulty: 'Intermediate',
    price: 99,
    instructor: 'Jane Admin',
    duration: '8 weeks',
    lessons: 24,
    students: 89,
    rating: 4.7,
    image: '/images/python-course.jpg',
    featured: true,
    syllabus: [
      'Python Basics',
      'NumPy and Pandas',
      'Data Visualization',
      'Machine Learning Basics',
      'Project Work'
    ],
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  },
  {
    id: 3,
    title: 'Web Development with React',
    description: 'Build modern web applications using React.js',
    category: 'Web Development',
    difficulty: 'Intermediate',
    price: 149,
    instructor: 'Jane Admin',
    duration: '10 weeks',
    lessons: 30,
    students: 200,
    rating: 4.8,
    image: '/images/react-course.jpg',
    featured: false,
    syllabus: [
      'React Fundamentals',
      'Components and Props',
      'State Management',
      'Hooks',
      'Building Full Applications'
    ],
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  },
  {
    id: 4,
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts and practices',
    category: 'Security',
    difficulty: 'Beginner',
    price: 0,
    instructor: 'Jane Admin',
    duration: '6 weeks',
    lessons: 18,
    students: 75,
    rating: 4.3,
    image: '/images/cybersecurity-course.jpg',
    featured: false,
    syllabus: [
      'Introduction to Cybersecurity',
      'Network Security',
      'Cryptography Basics',
      'Security Tools',
      'Incident Response'
    ],
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  },
  {
    id: 5,
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services cloud platform',
    category: 'Cloud Computing',
    difficulty: 'Advanced',
    price: 199,
    instructor: 'Jane Admin',
    duration: '12 weeks',
    lessons: 36,
    students: 120,
    rating: 4.6,
    image: '/images/aws-course.jpg',
    featured: true,
    syllabus: [
      'AWS Fundamentals',
      'EC2 and Storage',
      'Networking',
      'Security',
      'Deployment Strategies'
    ],
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  }
];

// Mock data for enrollments
const enrollments = [
  { userId: 3, courseId: 1, enrolledAt: new Date('2023-10-01') },
  { userId: 3, courseId: 4, enrolledAt: new Date('2023-10-15') },
  { userId: 4, courseId: 1, enrolledAt: new Date('2023-10-10') },
  { userId: 4, courseId: 4, enrolledAt: new Date('2023-10-20') }
];

module.exports = {
  users,
  courses,
  enrollments
};