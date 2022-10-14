const { transporterForEmail } = require('../../../config/mail.config');

const SendEmail = async (req, res) => {
    const { user_id, email } = req.body;

    transporterForEmail.sendMail({
        subject: "Activate your Iqama Account",
        from: "noreply@iqama.app",
        to: email,
        html: `
        <h1>Activate your account</h1>

        <p>Click the link below to activate your account</p>

        <button href="https://iiqama-api.herokuapp.com/auth/activate/${user_id}">
            Activate Account
        </button>
        `
    })
    .then(() => {
        return res.json({ message: "Email sent sucessfully!" })
    })
    .catch((err) => {
        return res.status(400).json({ code: err,  message: "Error while sending email!" })
    })

}

module.exports = {
    SendEmail: SendEmail
}