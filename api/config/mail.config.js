const nodemailer = require('nodemailer');

const testAccount = nodemailer.createTestAccount()
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
})

module.exports = {
    transporterForEmail: transporter
}