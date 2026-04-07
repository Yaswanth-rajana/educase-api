const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}:`, err);

    res.status(500).json({ 
        success: false,
        message: 'Something went wrong on the server',
        error: err.message // 🔥 ALWAYS SHOW FOR NOW
    });
};

module.exports = errorHandler;