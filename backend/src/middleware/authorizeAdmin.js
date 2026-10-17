
export function authorizeAdmin(req, res, next) {
    const role = req.user?.app_metadata?.role;

    if (role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Administrator access required"
        });
    }

    next();
}
