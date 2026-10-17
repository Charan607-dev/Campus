
export function validate(requiredFields = []) {
    return (req, res, next) => {
        const body = req.body || {};
        const missing = requiredFields.filter(
            (field) =>
                body[field] === undefined ||
                body[field] === null ||
                body[field] === ""
        );

        if (missing.length) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
                fields: missing
            });
        }

        next();
    };
}
