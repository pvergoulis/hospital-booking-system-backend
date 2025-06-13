const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userSchema = new Schema ({
    firstname :{
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique : true
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true
    },
    role:{
        type :String,
        enum : ['ADMIN',  'PATIENT'],
        default : 'PATIENT'
    },
    vat: {
        type: String,
        unique: true,
        minlength: 9,
        maxlength: 9
    },
    amka : {
        type: String,
        unique: true,
        minlength: 11,
        maxlength: 11
    },
    phone : {
        type: String 
    },
    age : {
        type: Number,
        required: true
    },
    mothersName: {
        type: String
    },
    fathersName: {
        type: String
    }
}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)