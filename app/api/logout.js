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

        const user = await getUser({ id: decodedRefreshToken.id });

        if (user == null) {
            return resolve({
                status: "error",
                statusCode: 400,
                message: "Invalid Refresh Token",
                code: "invalid_Refresh_token",
            }, 400)
        }

        if (user.refreshToken != data.refreshToken) {
            return resolve({
                status: "error",
                statusCode: 400,
                message: "Invalid Refresh Token",
                code: "invalid_Refresh_token",
            }, 400)
        }

        let updatedUser = await updateUser({ id: decodedRefreshToken.id }, {
            $set: {
                refreshToken: null,
                isLoggedIn: false
            }
        })

        if (updatedUser.err) {
            return resolve({
                status: "error",
                statusCode: 500,
                message: "Update Failed",
                code: "mongo_update_failed",
            }, 500)
        }

        return resolve({
            status: "success",
            statusCode: 201,
            message: "Logout Successfully",
            code: "logout_successful"
        }, 201);



    } catch (e) {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Invalid Refresh Token",
            code: "invalid_Refresh_token",
            err: e.message
        }, 400)
    }





}