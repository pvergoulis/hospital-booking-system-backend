const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'your_email@gmail.com',
            to,
            subject,
            text
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
