const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Logging middleware (shows all requests)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

// Routes
app.use('/', schoolRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});