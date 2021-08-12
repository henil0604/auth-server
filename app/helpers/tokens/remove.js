// Importing the config
const config = require("../../../config");
// Importing the Mongo helper
const mongo = require("../mongo");

// Exporting the function
module.exports = async (id, token) => {

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

        for (let i = 0; i < find.tokens.length; i++) {
            let t = find.tokens[i];
            if (t == token) {
                find.tokens.splice(i, 1);
            }
        }

        let updatedData = {
            $set: {
                tokens: find.tokens
            }
        }

        collection.findOneAndUpdate(toFind, updatedData, (err, result) => {
            resolve({ err, result })
        })


    })
}