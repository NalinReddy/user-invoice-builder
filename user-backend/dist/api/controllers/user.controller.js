'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'sunny.foru03@gmail.com',
        clientId: '1039591419359-6cmlmfh4d5r47a9331rhcvina2m90pbt.apps.googleusercontent.com',
        clientSecret: 'qyw7cXhcpbi-V1JZR1eOCGSx',
        refreshToken: '1/YsSboZJ4PglpaN36HpLg9YLVPfhzpmDZQ8JVUrvFsrLvtYs37RlNbS_SgR8eaeHV',
        accessToken: 'ya29.GlsbBuE61sUd8uJgx9C57K8BpWx6BRkLc_KuFfdNJ4CEkoTYOTpjL8Xmw18zwafpxGLc6UwWRVXr22rNugmKd1yd95HGi0tdl5l9wWxHYgCckwL9LE8saPY8M7as'
    }
});

/*************************************Sign up route **************************/
exports.default = {
    signup: function signup(req, res) {
        var _req$body = req.body,
            name = _req$body.name,
            email = _req$body.email,
            dob = _req$body.dob,
            password = _req$body.password;

        var schema = _joi2.default.object().keys({
            name: _joi2.default.string().required(),
            email: _joi2.default.string().required(),
            dob: _joi2.default.date().required(),
            password: _joi2.default.string().required()
        });

        var _joi$validate = _joi2.default.validate(req.body, schema),
            error = _joi$validate.error,
            value = _joi$validate.value;

        if (error && error.details) {
            return res.status(400).json(error);
        }
        var user = new _user2.default({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            password: _bcryptjs2.default.hashSync(req.body.password, 10)
        });
        user.save(function (error, result) {
            if (error) {
                return res.status(501).json(error);
            }
            return res.status(201).json(result);
        });
    },
    signin: function signin(req, res) {
        _user2.default.findOne({ email: req.body.email }, function (error, user) {
            if (error) {
                return res.status(501).json({
                    title: 'an error occured',
                    error: error
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'login failed!',
                    error: { message: 'invalid login credentials' }
                });
            }
            if (!_bcryptjs2.default.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'login failed!',
                    error: { message: 'invalid login credentials' }
                });
            }
            var token = _jsonwebtoken2.default.sign({ user: user }, 'secret', { expiresIn: 7200 });
            res.status(200).json({
                message: 'successfully logged in',
                token: token,
                user: user
            });
        });
    },
    reset: function reset(req, res) {
        if (req.body.email != undefined) {
            var email = req.body.email;
            _user2.default.findOne({ email: email }, function (error, user) {
                if (error) {
                    return res.status(501).json({
                        title: 'an error occured',
                        error: error
                    });
                }
                if (!user) {
                    return res.status(401).json({
                        title: 'no user found with this email address',
                        error: { message: 'invalid login credentials' }
                    });
                }
                var payload = {
                    id: user._id,
                    email: email
                    // var secret = user.password + '-' + user.createdAt;
                };var secret = 'test';
                var token = _jsonwebtoken2.default.sign(payload, secret);
                // console.log(jwt.decode(token))
                var data = {
                    to: user.email,
                    from: 'user-invoice-builder@gmail.com',
                    text: 'text',
                    html: '<h1>Hello ' + user.name + '</h1>\n              <span>follow the link to reset your password</span>\n              <a href=\'https://user-invoice-builder.herokuapp.com/forgotpassword/' + user._id + '/' + token + '\'>click here</a>\n        ',
                    subject: 'Password help has arrived!',
                    context: {
                        url: 'https://user-invoice-builder.herokuapp.com/user/reset/' + user._id + '?token=' + token,
                        name: user.name
                    }
                };
                smtpTransport.sendMail(data, function (error) {
                    if (!error) {
                        return res.json({ message: 'Kindly check your email for further instructions' });
                    } else {
                        console.log("from smtp", error);
                        return res.json({ error: error });
                    }
                });
                // res.status(200).json({
                //     userId:payload.id,
                //     token:token
                // })  
            });
        } else {

            res.status(501).json({ title: 'Email address is missing.' });
        }
    },
    accessReset: function accessReset(req, res) {
        // console.log(req.params.id,req.query.token)
        // var secret = user.password + '-' + user.createdAt;
        var secret = 'test';
        var payload = _jsonwebtoken2.default.decode(req.query.token, secret);

        res.status(200).json({ title: 'reset password!', uid: payload.id, token: req.query.token });
    },
    resetPass: function resetPass(req, res) {
        if (req.body.token != undefined) {
            var id = req.body.uid;
            var newPass = _bcryptjs2.default.hashSync(req.body.password, 10);
            _user2.default.findOneAndUpdate({ _id: id }, { password: newPass }, { new: true }).then(function (user) {
                return res.json({ title: 'password reset success' });
            }).catch(function (err) {
                return res.status(501).json(err);
            });
        } else {

            res.status(501).json({ title: 'No token specified.' });
        }
    }
};
//# sourceMappingURL=user.controller.js.map