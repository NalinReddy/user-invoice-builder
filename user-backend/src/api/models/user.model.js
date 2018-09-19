import  mongoose  from 'mongoose';


const UserSchema = new mongoose.Schema({
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
    createdAt:{
        type: Date,
        default: Date.now
    },
    invoices:[
         {
            type:mongoose.Schema.Types.ObjectId, ref: 'Invoice'
         },
        ]
})
export default mongoose.model('User',UserSchema)
