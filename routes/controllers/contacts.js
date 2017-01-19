var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://pabloejacome%40gmail.com:wvkuddksmpamumet@smtp.gmail.com');

module.exports.obj_Contacts = {};

module.exports.POST = function(req, res) {
    console.log('body:', req.body);

    transporter.sendMail(req.body, function (error, info) {
        if (error) {
            console.log('Error ------------------------------------\n');
            console.log(error);
            return res.sendStatus(400);
        }

        console.log('Message sent: ' + info.response);
        return res.sendStatus(200);
    });
}