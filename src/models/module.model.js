const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ModuleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true
    }
    // ,
    // default: {
    //     type: Boolean,
    //     required: true,
    //     trim:true,
    //     default:true
    // }
}, { timestamps: true });


const moduleSchema = mongoose.model("Module", ModuleSchema)
module.exports = moduleSchema;




