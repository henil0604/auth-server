// Loading toolBox
const toolBox = require("@henil0604/toolbox");
// Loading express
const express = require("express");
// creating **app** Object
const app = express();
// importing the config
const config = require("../config");
// importing body-parser
const bodyParser = require("body-parser");
// importing cookie-parser
const cookieParser = require("cookie-parser");
// importing path
const path = require("path");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// Logs Consoling
app.use((req, res, next) => {
    // logging to console using in-built logger from toolBox
    toolBox.logger(`${req.method} ${req.originalUrl}`, 'info', '[HIT]');
    // Passing the request to the next route
    next();
})

// Sending Helper Data to the next requests
app.use(async (req, res, next) => {

    req.config = config;

    // Setting MongoDBUtil from toolBox
    // req.MongoDb = new toolBox.MongoDbUtil({ connectionURI: req.config.MongoDb.connectionURI });

    // Passing the request to the next route
    next();
})

// Loading API route
app.use("/api", require("./api"));

// Loading scripts
app.use("/scripts", require("./scripts"));

app.use("/oauth", express.static(path.join(__dirname, "UI/public")))
// app.get("/oauth", (req, res) => {
//     res.sendFile('UI/public/index.html', { root: __dirname })
// })





app.use((req, res) => {
    if (!res.headerSent) {
        res.status(404).json({ statusCode: 404 })
    }
})

// Exporting the app object
module.exports = app;