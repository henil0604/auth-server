const config = require("../../config");
const getUser = require("../helpers/getUser");
const mongo = require("../helpers/mongo");
const updateUser = require("../helpers/updateUser");


module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = (data, statusCode = 200) => {
        if (!res.headerSent) {
            res.status(statusCode).json(data);
            return data;
        }
    }

    if (req.params.sessionId == undefined || req.params.sessionId == null || req.params.sessionId == "") {
        return resolve({
            status: "erorr",
            statusCode: 400,
            message: "Invalid SessionId",
            code: "invalid_sessionId"
        }, 400)
    }

    const dbo = await mongo();
    const database = dbo.useDb(config.MongoDb.databaseName);
    const collection = database.collection(config.MongoDb.collections['email-verification-sessions'].name);

    let session = await collection.findOne({
        sessionId: req.params.sessionId
    });

    if (session == null) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Session Not Found",
            code: "session_not_found"
        }, 400)
    }

    if (session.reacted) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Session has already been used",
            code: "session_already_used"
        }, 400)
    }

    if (parseInt(session.expiresAt) <= Date.now()) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Session Expired",
            code: "session_expired"
        }, 400);
    }

    const user = await getUser({ id: session.id });

    if (user.email_verified) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "User email has already been verified",
            code: "email_already_verified"
        }, 400)
    }

    // updating the user data
    const updatedUser = await updateUser({
        id: session.id
    }, {
        $set: {
            email_verified: true
        }
    })

    if (updatedUser.err) {
        return resolve({
            status: "erorr",
            statusCode: 500,
            message: "Failed to update the User Data",
            code: "mongo_update_failed"
        }, 500)
    }

    collection.findOneAndUpdate({
        sessionId: session.sessionId,
    }, {
        $set: {
            reacted: true
        }
    }, (err, result) => {

        if (err) {
            return resolve({
                status: "error",
                statusCode: 500,
                message: "Session Update Failed",
                code: "mongo_update_failed"
            }, 500)
        }


        return resolve({
            status: "success",
            statusCode: 201,
            message: "Email Succssfully Verified",
            code: "email_verified"
        }, 201);
    })
}