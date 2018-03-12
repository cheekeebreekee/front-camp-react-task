"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    _user2.default.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // use the following strategies
  passport.use(_local2.default);
};

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _local = require("./passport-strategies/local");

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }