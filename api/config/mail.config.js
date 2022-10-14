const nodemailer = require('nodemailer');

async function mailConfig(){
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    return transporter
}

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
    transporterForEmail: transporter,
    mailConfig: mailConfig
}