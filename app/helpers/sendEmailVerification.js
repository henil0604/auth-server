const ToolBox = require("@henil0604/toolbox");
const config = require("../../config");
const getTemplateHTML = require("./getTemplateHTML");
const getUser = require("./getUser");
const mongo = require("./mongo");
const sendEmail = require("./sendEmail");

module.exports = async (id, redirectWhenVerify) => {
    return new Promise(async resolve => {

        let user = await getUser({ id });

        if (user == null) {
            return resolve({
                status: "error",
                message: "User Not Found",
                statusCode: 400,
                code: "user_not_found"
            })
        };

        if (user.email_verified) {
            return resolve({
                status: "error",
                message: "User email has already been verified",
                statusCode: 400,
                code: "email_already_verified"
            })
        }

        const dbo = await mongo();
        const database = dbo.useDb(config.MongoDb.databaseName);
        const collection = database.collection(config.MongoDb.collections['email-verification-sessions'].name);

        const sessionId = ToolBox.randomBytes(34);

        let sessionData = {
            id,
            sessionId: sessionId,
            expiresAt: Date.now() + (config.env.EMAIL_VERIFICATION_SESSION_EXPIRE_MINUTES * 60 * 1000),
            reacted: false
        };

        await collection.insertOne(sessionData, async (err, result) => {
            if (err) {
                return resolve({
                    status: "error",
                    message: "Failed to insert Session",
                    statusCode: 500,
                    code: "mongo_insert_failed"
                })
            }

            let verificationLink = `${config.server.HOST}/api/verifyemail/${sessionId}`;

            if (redirectWhenVerify) {
                verificationLink += `?redirect=${redirectWhenVerify}`
            }

            let emailSent = await sendEmail({
                to: user.email,
                subject: "Email Verification",
                html: getTemplateHTML("email_verification", {
                    verificationLink: verificationLink,
                    username: user.username
                })
            })

            if (emailSent.status != "success") {
                return resolve({
                    status: "error",
                    message: "Failed to Send Email",
                    statusCode: 500,
                    code: "email_sending_failed"
                })
            }

            return resolve({
                status: "success",
                message: `Email has been Sent to ${user.email}`,
                statusCode: 201,
                code: "email_sent"
            })

        });

    });
}