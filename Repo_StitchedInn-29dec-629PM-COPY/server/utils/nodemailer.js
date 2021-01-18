const nodemailer = require("nodemailer");

let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env;
// } else {
//     secrets = require("./secrets");
// }

const emailService = nodemailer.createTransport({
    // host: secrets.EMAIL_HOST,
    // port: secrets.EMAIL_PORT,
    // secure: true,
    //less secure app allowed
    service:'gmail',
    auth: {
        user: 'stitchedinn@gmail.com',//secrets.EMAIL_USERNAME'',
        pass: 'Paki$tan123'//secrets.EMAIL_PW,
    },
});

module.exports = emailService;
