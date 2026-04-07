const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

// Root route - TEST THIS FIRST
app.get('/', (req, res) => {
    res.json({ message: 'School Management API is running', status: 'ok' });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Try to load routes, but with error handling
try {
    const schoolRoutes = require('./routes/schoolRoutes');
    app.use('/', schoolRoutes);
    console.log('Routes loaded successfully');
} catch (err) {
    console.error('Failed to load routes:', err.message);
    app.get('/listSchools', (req, res) => {
        res.status(500).json({ error: 'Routes not configured yet' });
    });
}

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});