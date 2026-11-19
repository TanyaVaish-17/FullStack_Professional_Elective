const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const role = req.headers.role;

        if (!role) {
            return res.status(401).json({
                message: "Role is required"
            });
        }

        if (allowedRoles.includes(role)) {
            next();
        } else {
            return res.status(403).json({
                message: "Not allowed"
            });
        }
    };
};

module.exports = checkRoles;