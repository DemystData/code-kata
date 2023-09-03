const User = require("../../models/user");

exports.createUser = (user) => {
  return User.create(user);
};

exports.getUser = (findQuery) => {
    return User.find(findQuery);
}
