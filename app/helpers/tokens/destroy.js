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

        let toFind = {
            id
        }

        let find = await collection.findOne(toFind)

        if (find == null) {
            resolve({ err: "No User Space Found", result: id });
        }

        collection.findOneAndDelete(toFind, (err, result) => {
            resolve({ err, result })
        })


    })
}