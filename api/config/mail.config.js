const nodemailer = require('nodemailer');

const testAccount = nodemailer.createTestAccount()
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'userpass'
    }
})

module.exports = {
    transporterForEmail: transporter
}