const nodemailer = require("nodemailer");
const config = require("../../config");

module.exports = async (data = {}) => {

    // create reusable transporter object using the default SMTP transport
    let transporterOptions = {
        ...config.nodemailer.transporterOptions,
    }

    let testAccount = null;

    if (config.nodemailer.testAccount) {
        testAccount = await nodemailer.createTestAccount();
        transporterOptions = {
            ...transporterOptions,
            ...testAccount.smtp
        };
        transporterOptions.auth = {
            user: testAccount.user,
            pass: testAccount.pass
        }
    }

    let transporter = nodemailer.createTransport(transporterOptions);

    let mailOptions = {
        from: config.nodemailer.transporterOptions.auth.user,
        ...data
    }

    if (config.nodemailer.testAccount) {
        mailOptions.from = testAccount.user;
    }

    let info = null;

    try {
        info = await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e)
        return {
            status: "error",
            message: "Failed to send Mail",
            e: e
        }
    }

    return {
        status: "success",
        info
    };
}