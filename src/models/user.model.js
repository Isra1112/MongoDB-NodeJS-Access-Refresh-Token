const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[{
        type: Schema.Types.ObjectId,
        required: false,
        ref:'Role'
    }]
},{ timestamps: true });


const user = mongoose.model("User",UserSchema)
module.exports = user;