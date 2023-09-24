const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cards: {
        type: Array,
        required: true,
    }
})

const Favorites = mongoose.model("favorites",favoritesSchema);
module.exports = Favorites;