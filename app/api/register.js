const config = require("../../config");
const toolBox = require("@henil0604/toolbox");
const getUser = require("../helpers/getUser");
const addUser = require("../helpers/addUser");
const sendEmailVerification = require("../helpers/sendEmailVerification");

// Exporting the module
module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = (data, statusCode = 200) => {
        if (!res.headerSent) {
            res.status(statusCode).json(data);
            return data;
        }
    }

    let data = req.body;

    // @debug
    // console.log(data);

    // Checking if email or user or method is empty
    if (data.email == undefined || data.username == undefined || data.method == undefined) {
        return resolve({
            // setting status
            status: "error",
            // setting status code
            statusCode: 400,
            // setting message
            message: "Bad Request",
            code: "email_or_username_or_method_undefined"
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

    // Checking if method is not equal to "auth" then authid must be there in data
    if (data.method != "auth" && data.authid == undefined) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Bad Request",
            code: "undefined_authid"
        }, 400);
    }

    /* ****checking if user already exists**** */

    // checking if username exists
    if (config.env.UNIQUE_USERNAME) {
        // getting the user
        const user = await getUser({
            username: data.username
        })
        // checking if user found
        if (user != null) {
            return resolve({
                status: "error",
                statusCode: 400,
                message: "Username is taken",
                code: "username_not_unique"
            }, 400);
        }
    }

    // checking if email exists
    // getting the user
    const user = await getUser({
        email: data.email
    })
    // checking if user found
    if (user != null) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Email is already Exists",
            code: "email_not_unique"
        }, 400);
    }

    let finalData = {
        username: data.username,
        email: data.email,
        method: data.method,
        password: data.password,
        authid: data.authid,
        id: toolBox.randomBytes(23),
        email_verified: false,
        avatar: data.avatar,
        createdAt: Date.now(),
        refreshToken: null,
        isLoggedIn: false,
        lastLogInAt: null,
    }

    // @debug
    // console.log(finalData)
    const added = await addUser(finalData);

    if (added.err) {
        return resolve({
            status: "error",
            statusCode: 500,
            message: "Failed to add user",
            code: "mongo_err"
        }, 500)
    }

    let emailSent = await sendEmailVerification(finalData.id, data.redirectWhenVerify);

    if (emailSent.status != "success") {
        return resolve(emailSent, emailSent.statusCode);
    }

    return resolve({
        status: "success",
        statusCode: 201,
        message: "User Created",
        code: "user_created",
        data: finalData
    }, 200)
}