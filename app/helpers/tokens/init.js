// Importing the config
const config = require("../../../config");
// Importing the Mongo helper
const mongo = require("../mongo");

// Exporting the function
module.exports = async (id) => {

    return new Promise(async resolve => {

        // getting MongoClient Instance
        const dbo = await mongo();
        // setting the database
        const database = dbo.useDb(config.MongoDb.databaseName)
        // getting the collection instance
        const collection = database.collection(config.MongoDb.collections.tokens.name);

        let find = await collection.findOne({
            id
        })

        if (find != null) {
            resolve({ err: "Token Space Already Exists", result: id });
        }

        let addData = {
            id,
            tokens: []
        };

        collection.insertOne(addData, (err, result) => {
            resolve({ err, result })
        })


    })
}