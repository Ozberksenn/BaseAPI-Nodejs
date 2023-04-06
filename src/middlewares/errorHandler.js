const APIError = require("../utils/errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    // instance of operatörü bir objenin belirli bir sınıfa ait olup olmadığını kontrol eder.
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Bir hata ile karşılaştık lütfen apinizi kontrol edin !",
  });
};

module.exports = errorHandlerMiddleware;
