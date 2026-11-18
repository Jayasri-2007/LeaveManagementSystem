
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const leaveRoutes = require('./routes/leaveRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Allow requests from deployed frontend websites
app.use(cors({
    origin: [
        'https://jayasri-2007.github.io',
        'https://leavemanagement-lsmz.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);

// Basic backend health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Leave Management System backend is running'
    });
});

// Connect database and start server
const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });
