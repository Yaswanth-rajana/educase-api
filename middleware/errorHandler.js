const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}:`, err.message);
    
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;