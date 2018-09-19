import  mongoose  from 'mongoose';
import User from './user.model';

const InvoiceSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    user:[
         {
            type:mongoose.Schema.Types.ObjectId, ref: 'User'
         },
        ]
})
// InvoiceSchema.post('remove', function(invoice){
//     User.findById(invoice.user, function(error, user){
//         user.invoices.pull(invoice);
//         user.save();
//     })
// })

export default mongoose.model('Invoice',InvoiceSchema)
