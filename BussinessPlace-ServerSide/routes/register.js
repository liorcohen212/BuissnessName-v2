const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Favorites = require("../models/Favorites");

const registerSchema = joi.object({
    firstname: joi.string().required().min(2),
    middlename: joi.string().min(0),
    lastname: joi.string().required().min(2),
    phone: joi.string().required().min(9),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    imageurl:joi.string().min(0),
    imagealt:joi.string().min(0),
    state:joi.string().min(0),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    housenumber: joi.number().required().min(1),
    zip:joi.number(),
    role: joi.string().required().min(5),
});

router.post("/", async (req,res) => {
    try {
        const {error} = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let userfind = await User.findOne({email: req.body.email});
        if (userfind) return res.status(400).send("user already exist in our system");
        adduser = new User(req.body);
        //encrypting the password
        let salt = await bcrypt.genSalt(10);
        adduser.password = await bcrypt.hash(adduser.password, salt);
        await adduser.save();

        let favorites = new Favorites({ userId: adduser._id, cards: [] });
        await favorites.save();

        const token = jwt.sign({ _id: adduser._id, role: adduser.role, email: adduser.email},
            process.env.jwtKey);
        res.status(201).send(token);
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;