'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invoiceRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _invoice = require('../api/controllers/invoice.controller');

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invoiceRouter = exports.invoiceRouter = _express2.default.Router();

//invoices
// invoiceRouter.use('/', invoiceController.verify)
invoiceRouter.get('/invoices', _invoice2.default.findAll);
invoiceRouter.get('/invoice/:id', _invoice2.default.findOne);
invoiceRouter.delete('/invoice/:id', _invoice2.default.delete);
invoiceRouter.put('/invoice/:id', _invoice2.default.update);
invoiceRouter.post('/invoices', _invoice2.default.create);
//# sourceMappingURL=invoice-routes.js.map