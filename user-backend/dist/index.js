'use strict';

var _invoiceRoutes = require('./config/invoice-routes');

var _userRoutes = require('./config/user-routes');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nalin:reddy95@ds251902.mlab.com:51902/users', {
    useNewUrlParser: true
});

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((0, _cors2.default)());
app.use('/api', _invoiceRoutes.invoiceRouter);
app.use('/user', _userRoutes.userRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
    console.log('server is running at port');
});
//# sourceMappingURL=index.js.map