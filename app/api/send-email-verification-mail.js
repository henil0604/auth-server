const sendEmailVerification = require("../helpers/sendEmailVerification")
const setResolver = require("../helpers/resolver");


module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = setResolver(res);


    if (req.params.id == undefined || req.params.id == null || req.params.id == "") {
        return resolve({
            status: "erorr",
            statusCode: 400,
            message: "Invalid Id",
            code: "invalid_id"
        }, 400)
    }

    let emailSent = await sendEmailVerification(req.params.id, req.query.redirectWhenVerify);

    return resolve(emailSent, emailSent.statusCode);
}