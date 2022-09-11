const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    roles:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Role'
    }
},{ timestamps: true });


const user = mongoose.model("User",UserSchema)
module.exports = user;