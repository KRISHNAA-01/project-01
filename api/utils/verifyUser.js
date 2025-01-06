// // import { errorHandler } from "./error.js";
// // import jwt from 'jsonwebtoken';

// // export const verifyToken=(req,res,next)=>{
// //     const token = req.cookies.access_token;

// //     if(!token) return next(errorHandler(401,'unauth'));
// //     jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
// //         if(err) return next(errorHandler(403,'Forbidden'));
// //         req.user = user;
// //         next();
// //     });
// // }
// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

// // export const verifyToken = (req, res, next) => {
// //   const token = req.cookies.access_token ;

// //   if (!token) return next(errorHandler(401, 'Unauthorized'));

// //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// //     if (err) return next(errorHandler(403, 'Forbidden'));

// //     req.user = user;
// //     next();
// //   });
// // };

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   // console.log("Access Token:", token); // Log token to verify it's being received

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return next(errorHandler(403, 'Forbidden'));
//       req.user = user;
//       // console.log("Decoded User:", user); // Log decoded user to ensure it's set
//       next();
//   });
// };

// verifyToken.js (Middleware)
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
