// Importing the config
const config = require("../../config");
// Importing the Mongo helper
const mongo = require("./mongo");

// Exporting the function
module.exports = async (data = {}) => {
    return new Promise(async (resolve) => {
        // getting MongoClient Instance
        const dbo = await mongo();
        // setting the database
        const database = dbo.useDb(config.MongoDb.databaseName)
        // getting the collection instance
        const collection = database.collection(config.MongoDb.collections.users.name);

        const added = collection.insertOne(data, (err, result) => {
            resolve({ err, result });
        })

    })
}