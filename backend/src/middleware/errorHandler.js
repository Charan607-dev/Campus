export function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
        path: req.originalUrl
    });
}

export function errorHandler(err, req, res, next) {
    console.error(err.stack || err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        success: false,
        message:
            err.status && err.status < 500
                ? err.message
                : "Internal server error"
    });
}