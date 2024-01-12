const CustomApiError = require("./customApiError");

const errorHandler = (err, req, res, next) => {
  //different error types - if error type is CustomApiError
  //it contains statusCode and message
  if (err instanceof CustomApiError)
    res.status(err.statusCode).json({ msg: err.message });
  else res.status(500).json({ msg: err.message });
};
module.exports = errorHandler;
