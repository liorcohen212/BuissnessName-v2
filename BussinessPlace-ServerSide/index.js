const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose");
const login = require("./routes/login");
const users = require("./routes/users");
const register = require("./routes/register");
const cards = require("./routes/cards");
const cors = require("cors");
const logger = require("morgan");
const path = require('path');
const rfs = require('rotating-file-stream');
const Favorites = require("./models/Favorites");
const app = express();
const port = process.env.PORT || 3000;

const accessLogStream = rfs.createStream('errors.log', {
    path: path.join(__dirname, 'logs')
})
app.use(logger("common"));
app.use(logger("common", { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 } }));

mongoose
.connect(process.env.DB, { useNewUrlParser: true})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));
app.use(express.json());
app.use(cors());
app.use("/api/login", login);
app.use("/api/users", users);
app.use("/api/register", register);
app.use("/api/cards", cards);
app.use("/api/favorites", Favorites);

app.listen(port, () => console.log("server logged in on port", port));