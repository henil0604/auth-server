// Loading the dotenv .env variables
require("dotenv").config();

// If SERVER_MODE is set to "DEVELOPMENT" export the dev.config.js
if (process.env.SERVER_MODE == "DEVELOPMENT") {
    module.exports = require("./dev.config")
};

// If SERVER_MODE is set to "PRODUCTION" export the production.config.js
if (process.env.SERVER_MODE == "PRODUCTION") {
    module.exports = require("./production.config")
};
