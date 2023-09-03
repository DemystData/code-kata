const { data1, data2 } = require("./accounting.data");
const {sendSuccess, createError} = require("../../helpers/response");

exports.getDetails = (req, res, next) => {
  const { provider } = req.params;
  if(provider === "Xero")
  {
     sendSuccess(res, data1);
  }
  else if(provider === "MYOB")
  {
     sendSuccess(res, data2);
  }
  else
  {
     next(createError("not allowed", 403));
  }
};
