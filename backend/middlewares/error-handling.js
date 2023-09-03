function logError(err, req, res, next) {
    next(err);
  }
  
  function sendError(err, req, res, next) {
    let statusCode = 500;
    if (err.statusCode) statusCode = err.statusCode;
    res.status(statusCode).send({
      metaData: {},
      error: {
        message: err.message,
        code: statusCode,
        info: err.info,
      },
    });
  }
  
  module.exports = {
    logError,
    sendError,
  };
  