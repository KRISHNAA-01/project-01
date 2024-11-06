import { errorHandler } from './error.js';

export const verifyAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return next(errorHandler(403, 'Access denied. Admins only.'));
    }
    next();
};