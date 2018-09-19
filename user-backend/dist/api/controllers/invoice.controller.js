"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _invoice = require("../models/invoice.model");

var _invoice2 = _interopRequireDefault(_invoice);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        var decode = _jsonwebtoken2.default.decode(req.query.token);
        _user2.default.findById(decode.user._id).populate("invoices").exec(function (error, user) {
            if (error) {
                res.status(404).json({
                    title: "not found",
                    error: error
                });
            }
            res.status(200).json({
                title: 'found!',
                body: user.invoices
            });
        });
        // .then(invoices => res.json(invoices))
        // .catch(err => res.status(500).json(err))
    },
    verify: function verify(req, res, next) {
        _jsonwebtoken2.default.verify(req.query.token, '$&*na340987jkl%#*', function (error, decode) {
            if (error) {
                return res.status(401).json({
                    title: 'Not Authenticated!',
                    error: error
                });
            }
            next();
        });
    },
    create: function create(req, res) {
        // const {name, email, dob, password}=req.body;
        var decode = _jsonwebtoken2.default.decode(req.query.token);
        _user2.default.findById(decode.user._id, function (error, user) {
            if (error) {
                return res.status(500).json({
                    title: 'an error occured!',
                    error: error
                });
            }
            var invoice = new _invoice2.default({
                name: req.body.name,
                email: req.body.email,
                dob: req.body.dob,
                password: req.body.password,
                user: user
            });
            invoice.save(function (error, invoice) {
                if (error) {
                    return res.status(500).json({
                        title: 'An error occured!',
                        error: error
                    });
                }
                user.invoices.push(invoice);
                user.save();
                res.status(200).json({
                    title: 'saved invoice',
                    obj: invoice
                });
            });
            // .then(invoice => {
            //     return res.status(200).json({
            //         body:invoice
            //     })
            // } 
            // .catch(err => res.status(500).json(err))
        });
    },
    findOne: function findOne(req, res) {
        var id = req.params.id;

        _invoice2.default.findById(id).then(function (invoice) {
            if (!invoice) {
                return res.status(404).json({ err: 'invoice could not found' });
            }
            return res.json(invoice);
        }).catch(function (error) {
            return res.status(501).json(error);
        });
    },
    delete: function _delete(req, res) {
        var id = req.params.id;

        _invoice2.default.findByIdAndRemove(id).then(function (invoice) {
            if (!invoice) {
                return res.status(404).json({ err: 'invoice could not be deleted' });
            }
            return res.json(invoice);
        }).catch(function (error) {
            return res.status(501).json({
                title: 'some error',
                error: error
            });
        });
    },
    update: function update(req, res) {
        var id = req.params.id;
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
        _invoice2.default.findOneAndUpdate({ _id: id }, value, { new: true }).then(function (invoice) {
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(501).json(err);
        });
    }
};
//# sourceMappingURL=invoice.controller.js.map