const jwt = require("jsonwebtoken");
const config = require("../../config");

const generateTokens = (data = {}) => {

    if (data.password != undefined) {
        data.password = undefined;
    }

    const refreshToken = jwt.sign(data, config.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(data, config.env.ACCESS_TOKEN_SECRET, { expiresIn: config.env.ACCESS_TOKEN_EXPIRE_IN });

    return { refreshToken, accessToken };
}


module.exports = generateTokens;