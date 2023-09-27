const bcrypt = require("bcrypt");
const queries = require("./user.queries");
const { sendSuccess, createError } = require("../../helpers/response");

exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  let user = {
    email: email,
  };

  let hashPassword = bcrypt.hashSync(password, 10);
  user.password = hashPassword;
  queries
    .createUser(user)
    .then((result) => {
      return sendSuccess(res, result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;
  let findQuery = {
    email: email,
  };

  queries
    .getUser(findQuery)
    .then((result) => {
      if (result.length == 0) {
        const error = createError("No User Found", 401, {
          detail: "Wrong Email Id or Inactive User",
        });
        return next(error);
      }
      const user = result[0];
      bcrypt.compare(password, user.password, function (err, isPasswordCorrect) {
        if (err) return next(err);

        if (!isPasswordCorrect) {
          const error = createError("Wrong Credentials", 401);
          return next(error);
        }
        return sendSuccess(res, { isValid: true });
      });
    })
    .catch((err) => next(err));
};
