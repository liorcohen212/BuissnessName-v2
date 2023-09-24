const express = require("express");
const Favorites = require("../models/Favorites");
const router = express.Router();

const favoritesSchema = joi.object({
    id: joi.string().required(),
    cards: joi.array().required()
})

router.post("/", auth, async (req, res) => {
    try {
        const {error} = favoritesSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        let favorites = await Favorites.findOne({ _id: req.payload._id });

        if (!favorites)
            return res.status(404).send("error has accured");

        const isFavorite = favorites.cards.find((fav) => fav._id == req.body._id);


        if (isFavorite) {
            let Deletefavorite = favorites.cards.findIndex((fav) => fav._id == req.body._id)
            favorites.cards.splice(Deletefavorite, 1);
        } else {
            favorites.cards.push(req.body);
        }

        await favorites.save();
        res.status(201).send(" card added to favorites.");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:_id", auth, async (req, res) => {
    try {
        const favorites = await Favorites.findOne({ _id: req.params._id });
        if (!favorites) return res.status(204).send(["no favorites yet"]);
        res.status(200).send(favorites);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;