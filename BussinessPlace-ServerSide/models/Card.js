const { any } = require("joi");
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 2
    },
    description:{
        type: String,
        required : true,
        minlength: 2
    },
    email:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required : false,
        minlength: 0
        
    },
    state:{
        type: String,
        required : false,
        minlength: 0
    },
    city:{
        type: String,
        required: true,
        minlength: 2
    },
    housenumber:{
        type: Number,
        required: true,
        minlength: 1
    },
    subtitle:{
        type: String,
        required: true,
        minlength: 2
    },
    phone:{
        type: String,
        required: true,
        minlength: 9
    },
    web:{
        type: String,
        required : false,
        minlength: 0
    },
    imageAlt:{
        type: String,
        required : false,
        minlength: 0
    },
    country:{
        type: String,
        required : true,
        minlength: 2
    },
    street:{
        type: String,
        required : true,
        minlength: 2
    },
    zip:{
        type: Number,
        required : false,
        minlength: 0
    },
    owner:
    {
        type: String ,
        minlength: 0
    },
});

const Card = mongoose.model("cards",cardSchema);
module.exports = Card;