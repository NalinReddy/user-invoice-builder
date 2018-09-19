'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvoiceSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: [{
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User'
    }]
});
// InvoiceSchema.post('remove', function(invoice){
//     User.findById(invoice.user, function(error, user){
//         user.invoices.pull(invoice);
//         user.save();
//     })
// })

exports.default = _mongoose2.default.model('Invoice', InvoiceSchema);
//# sourceMappingURL=invoice.model.js.map