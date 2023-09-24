const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
});

router.post("/", async (req,res) => {
    try{
    const { error  }= loginSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("wrong password or email try again");

    let result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Wrong password or password try again");

    const token = jwt.sign(
        { _id: user._id, role: user.role, email: user.email},
        process.env.jwtKey
    );
    res.status(200).send(token);
} catch(error) {
    res.status(400).send(error);
}
})

module.exports = router;