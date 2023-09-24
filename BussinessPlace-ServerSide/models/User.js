const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required : true,
        minlength: 2
    },
    middlename:{
        type: String,
        minlength: 0
    },
    lastname:{
        type: String,
        required : true,
        minlength: 2
    },
    phone:{
        type: String,
        required : true,
        minlength: 9
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    imageurl:{
        type: String,
        minlength: 0
    },
    imagealt:{
        type: String,
        minlength: 0
    },
    state:{
        type: String,
        minlength: 0
    },
    country:{
        type: String,
        required : true,
        minlength: 2
    },
    city:{
        type: String,
        required : true,
        minlength: 2
    },
    street:{
        type: String,
        required : true,
        minlength: 2
    },
    housenumber:{
        type: Number,
        required : true,
        minlength: 1
    },
    zip:{
        type: Number,
        minlength: 0
    },
    role:
    {
        type: String,
        required: true,
        minlength: 5
    },
});

const User = mongoose.model("users",userSchema);
module.exports = User;