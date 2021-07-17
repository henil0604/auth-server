const jwt = require("jsonwebtoken");
const config = require("../../config");
const getUser = require("../helpers/getUser");
const updateUser = require("../helpers/updateUser");

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

    if (data.refreshToken == undefined || data.refreshToken == null || data.refreshToken == "") {
        return resolve({
            status: "error",
            status_code: 400,
            message: "Invalid Refresh token",
            code: "invalid_refresh_token"
        }, 400);
    }

    try {
        const decodedRefreshToken = await jwt.verify(data.refreshToken, config.env.REFRESH_TOKEN_SECRET);

        const user = await getUser({ id: decodedRefreshToken.id })

        if (user == null) {
            return resolve({
                status: "error",
                statusCode: 400,
                message: "User Not Found",
                code: "user_not_found"
            }, 400)
        }

        let updatedUser = await updateUser({ id: user.id }, {})


        // // creating the userdata for storing in token
        // let tokenData = {
        //     username: user.username,
        //     email: user.email,
        //     method: user.method,
        //     createdAt: user.createdAt,
        //     id: user.id,
        //     avatar: user.avatar,
        //     lastLogInAt: user.lastLogInAt,
        //     email_verified: user.email_verified
        // }





    } catch (e) {
        return resolve({
            status: "error",
            statusCode: 401,
            message: "Invalid Refresh Token",
            code: "invalid_Refresh_token",
            err: e.message
        }, 401)
    }




}