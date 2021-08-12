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



    let user = await getUser(data)

    return resolve({
        status: "success",
        statusCode: 200,
        data: {
            found: user == null ? false : true
        },
    }, 200)

}