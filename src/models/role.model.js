const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    default:{
        type:Boolean,
        required:true
    }
}, { timestamps: true });


const role = mongoose.model("Role", RoleSchema)
module.exports = role;