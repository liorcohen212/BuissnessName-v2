const express = require("express");
const router = express.Router();
const joi = require("joi");
const Card = require("../models/Card");
const auth = require("../middlewares/auth");

const mycardsSchema = joi.object({
    owner: joi.string().required().min(1)
});
const cardsSchema = joi.object({
    title: joi.string().required().min(2),
    description: joi.string().required().min(2),
    email: joi.string().required().email(),
    imageUrl: joi.string().min(0),
    state: joi.string().min(0),
    city: joi.string().required().min(2),
    housenumber: joi.number().required().min(1),
    subtitle: joi.string().required().min(2),
    phone: joi.string().required().min(9),
    web: joi.string().min(0),
    imageAlt: joi.string().min(0),
    country: joi.string().required().min(2),
    street: joi.string().required().min(2),
    zip: joi.number().min(0),
    owner: joi.string().min(0),
});


router.get("/", async (req,res) => {
    try{
        const cards = await Card.find();
        if(!cards) res.status(400).send("there are no bussiness cards to show")
        res.status(200).send(cards);
    }catch(error){
        res.status(400).send(error);
    }
});

router.get("/my-cards", auth , async (req,res) => {
    try{
        if(req.payload.role != "isAdmin" && req.payload.role != "isUser" && req.payload.role != "isBussiness")
        return res.status(400).send("youre not autorized to enter");
        const {error} = mycardsSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        owner = card.owner
    let cards = await Card.find({phone: req.payload.phone});
if (!cards) res.status(404).send("no cards found");
res.status(200).send(cards);
    }catch(error){
        res.status(400).send(error);
        console.log(req.body);
    }
})

router.get("/:_id", async (req,res) => {
    try{
        let cards = await Card.findOne({_id : req.params._id});
        if (!cards) res.status(404).send("card not found");
        res.status(200).send(cards);
    }catch(error){
        res.status(400).send(error);
    }
})

router.post("/", auth, async (req,res) => {
    try{
        if (req.payload.role != "isAdmin" && req.payload.role != "isBussiness")
        return res.status(400).send("youre not autorized to post a cards")

        const {error} = cardsSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        
        let cardfind = await Card.findOne({title: req.body.title, phone: req.body.phone});
        if (cardfind) return res.status(400).send("card already exist in our system");
        console.log(`reqBody: ${JSON.stringify(req.body)}`);
        newcard = new Card(req.body);
        console.log(newcard);
        await newcard.save();

        res.status(201).send(newcard);
    }catch(error){
        res.status(400).send(error);
   
    }
})

router.put("/:_id",auth , async (req,res) => {
    try{

        if (req.payload.role != "isAdmin" && req.payload.email != req.body.owner)
        return res.status(400).send("Only Admin or owner can change the card")

        const { error } = cardsSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        const updatecard = await Card.findByIdAndUpdate({
            _id: req.params._id},
            req.body,
            {new: true});
            if (!updatecard) return res.status(404).send("card doesnt exist");
            res.status(200).send(updatecard);
    }catch(error){
        res.status(400).send(error)
    }
});

router.delete("/:_id",auth, async (req,res) => {
    try{
        if (req.payload.role != "isAdmin" && req.payload.email != req.body.owner)
        return res.status(400).send("Only Admin or owner can delete the card")

        let deletecard = await Card.findOneAndDelete({
            _id: req.params._id});
        if(!deletecard) res.status(404).send("card didnt delete")
        res.status(200).send(`${deletecard.title} was deleted successfully`);
    }catch(error){
        res.status(400).send(error)
    }
});

module.exports = router;