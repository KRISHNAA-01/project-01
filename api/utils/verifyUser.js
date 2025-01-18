
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Unauthorized - Please sign in again'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If the token is expired or invalid, clear the cookie and send an unauthorized response
      res.clearCookie('access_token');
      return next(errorHandler(401, 'Session expired. Please sign in again.'));
    }
    req.user = user;
    next();
  });
};
