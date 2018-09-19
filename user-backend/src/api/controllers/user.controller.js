import joi from 'joi';
import User from "../models/user.model";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
 const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

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
})

/*************************************Sign up route **************************/
   export default {
    signup(req, res){
        const {name, email, dob, password}= req.body;
        const schema = joi.object().keys({
            name: joi.string().required(),
            email: joi.string().required(),
            dob:joi.date().required(),
            password:joi.string().required()
        })
        const {error, value}=joi.validate(req.body, schema);
        if(error && error.details){
            return res.status(400).json(error);
        }
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        user.save( (error, result)=> {
            if(error){
                return res.status(501).json(error)
            }
            return res.status(201).json(result)
        } )
    },
    signin(req, res){
        User.findOne({email: req.body.email}, (error, user) => {
            if(error){
                return res.status(501).json({
                    title:'an error occured',
                    error: error
                })
            }
            if(!user) {
                return res.status(401).json({
                    title:'login failed!',
                    error: {message: 'invalid login credentials'}
                })
            }
            if(!bcrypt.compareSync(req.body.password,user.password)){
                return res.status(401).json({
                    title:'login failed!',
                    error: {message: 'invalid login credentials'}
                })
            }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message:'successfully logged in',
            token: token,
            user:user
        })
            
        })
    },
    reset(req, res){
        if(req.body.email != undefined){
            var email = req.body.email;
            User.findOne({email: email}, (error, user) => {
            if(error){
                return res.status(501).json({
                    title:'an error occured',
                    error: error
                })
            }
            if(!user) {
                return res.status(401).json({
                    title:'no user found with this email address',
                    error: {message: 'invalid login credentials'}
                })
            }
          var payload = {
                id: user._id,
                email:email
            } 
             // var secret = user.password + '-' + user.createdAt;
            var secret ='test'
            var token = jwt.sign(payload, secret);
            // console.log(jwt.decode(token))
        var data = {
        to: user.email,
        from: 'user-invoice-builder@gmail.com',
        text: 'text',
        html:`<h1>Hello ${user.name}</h1>
              <span>follow the link to reset your password</span>
              <a href='https://user-invoice-builder.herokuapp.com/forgotpassword/${user._id}/${token}'>click here</a>
        `,
        subject: 'Password help has arrived!',
        context: {
          url: 'https://user-invoice-builder.herokuapp.com/user/reset/'+user._id+'?token='+token,
          name: user.name
        }
      }
      smtpTransport.sendMail(data, function(error) {
        if (!error) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
            console.log("from smtp", error)
          return res.json({error:error});
        }
      });
            // res.status(200).json({
            //     userId:payload.id,
            //     token:token
            // })  
        })

        }else {

        res.status(501).json({title:'Email address is missing.'});
    }
    },
    accessReset(req, res){
        // console.log(req.params.id,req.query.token)
        // var secret = user.password + '-' + user.createdAt;
        var secret ='test'
        var payload = jwt.decode(req.query.token, secret)

        res.status(200).json({title: 'reset password!', uid:payload.id,token:req.query.token})
    },
    resetPass(req, res){
        if(req.body.token != undefined){
            var id = req.body.uid;
            var newPass = bcrypt.hashSync(req.body.password, 10)
            User.findOneAndUpdate({_id: id},{password:newPass},{new:true})
        .then((user) => res.json({title:'password reset success'}))
        .catch(err => res.status(501).json(err))
    }
        else {

        res.status(501).json({title:'No token specified.'});
    }
    },
 }