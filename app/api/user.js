const jwt = require("jsonwebtoken");
const config = require("../../config");

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

    if (data.accessToken == undefined || data.accessToken == null || data.accessToken == "") {
        return resolve({
            status: "error",
            status_code: 400,
            message: "Invalid access token",
            code: "invalid_access_token"
        }, 400);
    }

    try {
        const decodedAcessToken = await jwt.verify(data.accessToken, config.env.ACCESS_TOKEN_SECRET);

        res.send(decodedAcessToken);

    } catch (e) {
        return resolve({
            status: "error",
            statusCode: 401,
            message: "Invalid Access Token",
            code: "invalid_access_token"
        }, 401)
    }



}