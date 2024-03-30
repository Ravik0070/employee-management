const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) res.status(403).json("Token  is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
//only admins
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "Admin") {
      next();
    } else {
      res.status(403).json("Access Denied");
    }
  });
};
//only managers and admins
const verifyTokenAndManagersOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "Admin" || req.user.role == "Manager") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that either");
    }
  });
};
//all employees
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.role == "Admin" ||
      req.user.role == "Manager" ||
      req.user.role == "Employee"
    ) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that either");
    }
  });
};

module.exports = {
  verifyTokenAndManagersOrAdmin,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
