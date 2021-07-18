const generateTokens = require("../helpers/generateTokens");
const getUser = require("../helpers/getUser");
const updateUser = require("../helpers/updateUser");
const sendEmail = require("../helpers/sendEmail");
const getTemplateHTML = require("../helpers/getTemplateHTML");
const sendEmailVerification = require("../helpers/sendEmailVerification");

// exporting the module
module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = (data, statusCode = 200) => {
        if (!res.headerSent) {
            res.status(statusCode).json(data);
            return data;
        }
    }

    // Setting the data
    let data = req.body;

    // @debug
    // console.log(data);

    // Checking if email or user or method is empty
    if (data.email == undefined || data.method == undefined) {
        return resolve({
            // setting status
            status: "error",
            // setting status code
            statusCode: 400,
            // setting message
            message: "Bad Request",
            code: "email_or_method_undefined"
        }, 400);
    }

    // Checking if method is equal to "auth" then password must be there in data
    if (data.method == "auth" && data.password == undefined) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Bad Request",
            code: "undefined_password"
        }, 400);
    }

    let findUserData = {
        email: data.email
    }

    const user = await getUser(findUserData);

    if (user == null) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Email is not Registered",
            code: "email_not_registered"
        }, 400)
    }

    if (!user.email_verified) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Email is Not Verified",
            code: "unverified_email"
        }, 400);
    }

    if (user.method != data.method) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: `Invalid Login Method. Expected Method: ${user.method}`,
            code: "invalid_login_method"
        }, 400)
    }

    if (user.method == "auth" && (user.password != data.password)) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Invalid Password",
            code: "invalid_password"
        }, 400)
    }

    if (user.method != "auth" && (user.authid != data.authid)) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Invalid AuthId",
            code: "invalid_authid"
        }, 400)
    }

    // Checking if method is not equal to "auth" then authid must be there in data
    if (data.method != "auth" && data.authid == undefined) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Bad Request",
            code: "undefined_authid"
        }, 400);
    }

    // creating the userdata for storing in token
    let tokenData = {
        username: user.username,
        email: user.email,
        method: user.method,
        createdAt: user.createdAt,
        id: user.id,
        avatar: user.avatar,
        lastLogInAt: user.lastLogInAt,
        email_verified: user.email_verified
    }

    // generating tokens
    const tokens = generateTokens(tokenData);

    // changing the state of user in database
    const updated = await updateUser(findUserData, {
        $set: {
            refreshToken: tokens.refreshToken,
            isLoggedIn: true,
            lastLogInAt: Date.now()
        }
    })

    // @debug
    // console.log(updated);

    // checking if update was successful
    if (updated.err) {
        return resolve({
            status: "error",
            code: 500,
            message: "Failed to update your data",
            code: "mongo_update_failed"
        }, 500);
    }

    // Sending success response
    return resolve({
        status: "success",
        code: 201,
        message: "Logged In",
        data: tokens
    }, 200)
}