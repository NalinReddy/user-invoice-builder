'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../api/controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = exports.userRouter = _express2.default.Router();

//singup
userRouter.post('/register', _user2.default.signup);

//signin
userRouter.post('/signin', _user2.default.signin);

//reset
userRouter.get('/reset/:id', _user2.default.accessReset);
userRouter.post('/reset', _user2.default.reset);
userRouter.post('/resetpassword', _user2.default.resetPass);
//# sourceMappingURL=user-routes.js.map