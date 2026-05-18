const validate = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400);
      return next(new Error(`Missing required fields: ${missingFields.join(', ')}`));
    }

    next();
  };
};

module.exports = validate;
