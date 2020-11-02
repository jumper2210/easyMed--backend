const authRole = (role) => {
  return (req, res, next) => {
    if (req.role !== role) {
      const error = new Error("Not allowed");
      res.status(401);
      next(error);
    }
    next();
  };
};

module.exports = { authRole };
