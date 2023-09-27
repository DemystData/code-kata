exports.sendSuccess = (res, responsePayload, message, statusCode = 200) => {
    return res.status(statusCode).send({ metaData: {}, data: responsePayload, message });
  };
  exports.sendSuccessWithMeta = (res, responsePayload, metaData, message, statusCode = 200) => {
    return res.status(statusCode).send({ metaData: metaData, data: responsePayload, message });
  };
  
  exports.createError = (message, statusCode, info = {}) => {
    return { message, statusCode, info };
  };
  