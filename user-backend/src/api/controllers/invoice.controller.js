import joi from 'joi';
import Invoice from "../models/invoice.model";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';


export default {
    findAll(req, res , next){
        var decode = jwt.decode(req.query.token);
        User.findById(decode.user._id).populate("invoices").exec(function(error,user){
            if(error){
                res.status(404).json({
                    title:"not found",
                    error:error
                })
            }
            res.status(200).json({
               title:'found!',
               body:user.invoices
            })
        })
      // .then(invoices => res.json(invoices))
      // .catch(err => res.status(500).json(err))
    },

 verify(req, res, next){
      jwt.verify(req.query.token, '$&*na340987jkl%#*', function(error, decode){
        if(error){
            return res.status(401).json({
                title:'Not Authenticated!',
                error:error
            })
        }
        next()
      })
    },
    create(req,res){
        // const {name, email, dob, password}=req.body;
        var decode = jwt.decode(req.query.token);
        User.findById(decode.user._id, function(error, user){
            if(error){
                return res.status(500).json({
                    title:'an error occured!',
                    error:error
                })
            }
            var invoice = new Invoice({
            name: req.body.name,
            email:req.body.email,
            dob:req.body.dob,
            password:req.body.password,
            user:user
        })
        invoice.save(function(error, invoice){
            if(error) {
                return res.status(500).json({
                    title:'An error occured!',
                    error:error
                })
            }
            user.invoices.push(invoice)
            user.save()
            res.status(200).json({
                title:'saved invoice',
                obj: invoice
            })
        })
        // .then(invoice => {
        //     return res.status(200).json({
        //         body:invoice
        //     })
        // } 
        // .catch(err => res.status(500).json(err))

         })
        
},
    findOne(req, res){
        let {id} = req.params;
        Invoice.findById(id)
        .then(invoice => {
            if(!invoice){
                return res.status(404).json({err:'invoice could not found'})
            }
            return res.json(invoice);
        })
        .catch(error => res.status(501).json(error))
    },
    delete(req, res){
        let {id} = req.params;
        Invoice.findByIdAndRemove(id)
        .then(invoice => {
            if(!invoice){
                return res.status(404).json({err:'invoice could not be deleted'})
            }
            return res.json(invoice);
        })
        .catch(error => res.status(501).json({
            title:'some error',
            error:error
        }))
    },
    update(req, res){
        let {id}=req.params;
        const {name, email, dob, password}=req.body;
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
        Invoice.findOneAndUpdate({_id: id},value,{new:true})
        .then(invoice => res.json(invoice))
        .catch(err => res.status(501).json(err))
    }
};