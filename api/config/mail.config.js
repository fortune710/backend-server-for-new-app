const nodemailer = require('nodemailer');

async function mailConfig(){
    const testAccount = await nodemailer.createTestAccount().then(res => { return res })
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

const testAccount = await nodemailer.createTestAccount().then(res => { return res })
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