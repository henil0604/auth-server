const jwt = require("jsonwebtoken");
const config = require("../../config");
const generateTokens = require("../helpers/generateTokens");
const getUser = require("../helpers/getUser");
const setResolver = require("../helpers/resolver");
const getToken = require("../helpers/tokens/get");

module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = setResolver(res);

    // Setting the data
    let data = req.body;

    if (data.refreshToken == undefined || data.refreshToken == null || data.refreshToken == "") {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Invalid Refresh token",
            code: "invalid_refresh_token"
        }, 400);
    }

    try {
        const decodedRefreshToken = await jwt.verify(data.refreshToken, config.env.REFRESH_TOKEN_SECRET);

        const refreshToken = await getToken(decodedRefreshToken.id, data.refreshToken)

        if (refreshToken.err != null || refreshToken.result == null) {
            return resolve({
                status: "error",
                statusCode: 400,
                message: "User Not Found",
                code: "user_not_found"
            }, 400)
        }

        let user = await getUser({ id: decodedRefreshToken.id })

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

        const { accessToken } = generateTokens(tokenData);

        resolve({
            status: "success",
            statusCode: 201,
            message: "Successfully Generated Access Token",
            code: "access_token_generated",
            data: {
                accessToken
            }
        })

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