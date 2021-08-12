const jwt = require("jsonwebtoken");
const config = require("../../config");
const setResolver = require("../helpers/resolver");

module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = setResolver(res);

    // Setting the data
    let data = req.body;

    if (data.accessToken == undefined || data.accessToken == null || data.accessToken == "") {
        return resolve({
            status: "error",
            statusCode: 400,
            message: "Invalid access token",
            code: "invalid_access_token"
        }, 400);
    }

    try {
        const decodedAccessToken = await jwt.verify(data.accessToken, config.env.ACCESS_TOKEN_SECRET);
        return resolve({
		status: "success",
		statusCode: 200,
		message: "User Info Decoded",
		code: "user_info_decoded",
		data: decodedAccessToken
	}, 200);

    } catch (e) {
	
        return resolve({
            status: "error",
            statusCode: 401,
            message: "Invalid Access Token",
            code: "invalid_access_token"
        }, 401)
    }



}
