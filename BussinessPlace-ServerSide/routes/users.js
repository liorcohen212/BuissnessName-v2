const express = require("express");
const User = require("../models/User");
const joi = require("joi");
const Favorites = require("../models/Favorites");
const auth = require("../middlewares/auth");
const router = express.Router();

const usersSchema = joi.object({
    firstname: joi.string().required().min(2),
    middlename: joi.string().min(0),
    lastname: joi.string().required().min(2),
    phone: joi.string().required().min(9),
    email: joi.string().required().email(),
    state:joi.string().min(0),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    housenumber: joi.number().required().min(1),
    role: joi.string().required().min(5),
    zip: joi.number().min(0)
});

//get all users
router.get("/",auth , async (req,res) => {
    try{
        if (req.payload.role != "isAdmin")
        return res.status(400).send("Only Admin get do this action");
        const users = await User.find();
        res.status(200).send(users);
    }catch(error){
        res.status(400).send(error);
    }
});
//get one user
router.get("/:_id", auth, async (req,res) => {
    try{
        if (req.payload.role != "isAdmin" && req.payload._id != req.params._id)
        return res.status(400).send("log in to find the user")
        const user = await User.findById( req.params._id);
        if (!user) return res.status(404).send("user not found");
        res.status(200).send(user);

    } catch(error){
        res.status(400).send(error);
    }
})

router.put("/:_id", auth , async (req,res) => {
    try{
        if (req.payload.role != "isAdmin" && req.payload._id != req.params._id)
        return res.status(400).send("you have to log in to update user")

        const { error } = usersSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        const user = await User.findOneAndUpdate(
            { _id: req.params._id },
            req.body,
            {new: true}
            );
            if (!user) return res.status(400).send("user doesnt exist");
            res.status(200).send(user);
    }catch(error){
        res.status(400).send(error);
    }
});

router.patch("/:_id", auth, async (req, res) => {
    try {
        if (req.payload.role != "isAdmin")
            return res.status(400).send("only admins can do this action")

        const { error } = usersSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let user = await User.findById(req.params._id);
        if (!user) return res.status(400).send("no user found");

        user = Object.assign(user, req.body);

        user = await User.findOneAndUpdate({ _id: req.params._id },
            user,
            { new: true });
        if (!user) return res.status(400).send("No such user")

        res.status(200).send(`${user.email} was updated successfully!!`)

    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete("/:_id", auth , async (req,res) => {
    try{
        if (req.payload.role != "isAdmin" && req.payload._id != req.params._id)
        return res.status(400).send("you have to be logged in to delete users")

let deleteduser = await User.findOneAndDelete({ _id: req.params._id });
if(!deleteduser) res.status(404).send("user didnt delete")
res.status(200).send(deleteduser);
    }catch(error){
        res.status(400).send(error)
    }
});
module.exports = router;