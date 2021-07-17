const sendEmailVerification = require("../helpers/sendEmailVerification")

module.exports = async (req, res) => {

    // Setting the resolver
    const resolve = (data, statusCode = 200) => {
        if (!res.headerSent) {
            res.status(statusCode).json(data);
            return data;
        }
    }


    if (req.params.id == undefined || req.params.id == null || req.params.id == "") {
        return resolve({
            status: "erorr",
            statusCode: 400,
            message: "Invalid Id",
            code: "invalid_id"
        }, 400)
    }

    let emailSent = await sendEmailVerification(req.params.id);

    return resolve(emailSent, emailSent.statusCode);
}