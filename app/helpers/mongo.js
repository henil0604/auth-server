const config = require("../../config");
const mongoose = require("mongoose");

// Exporting the function
module.exports = async () => {
    return (await mongoose.connect(config.MongoDb.connectionURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })).connection
}