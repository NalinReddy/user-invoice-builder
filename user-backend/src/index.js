const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
import {invoiceRouter} from './config/invoice-routes';
import {userRouter} from './config/user-routes';
import cors from 'cors'
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nalin:reddy95@ds251902.mlab.com:51902/users', {
	useNewUrlParser:true
});

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', invoiceRouter);
app.use('/user', userRouter);
app.use(express.static(path.join(__dirname, 'public')));


app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.listen(process.env.PORT || 3000, function(){
    console.log(`server is running at port`);
})