const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    modules:[{
        type: Schema.Types.ObjectId,
        required: false,
        ref:'Module'
    }]
}, { timestamps: true });


const role = mongoose.model("Role", RoleSchema)
module.exports = role;




