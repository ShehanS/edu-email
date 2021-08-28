const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();

let transporter = nodemailer.createTransport(smtpTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
    },
    tls:{
        rejectUnauthorized: false
    }
}));

app.post('/singup-notify', (req, res)=>{
    let name =   req.body.name;
    let email = req.body.email;
    let url = req.body.url;

    const singupTemplate= `<div style="background-color: #341d75; color: #ffff; padding: 20px; font-family: Candara; text-align: center; font-size: 16px;">
    <h3 style="font-family: Candara; color: #ffff; font-size: 40px !important; padding: 10px; text-align: center;">Congratulations&nbsp;</h3>
    <p>Hi ${name}</p>
    <p>We would like to inform your request has been processing. You have to follow few steps to complete registration.</p>
    <hr style="background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 51%, rgba(255,255,255,0) 100%); height: 1px; border: none;" />
    <p>Please click below url to complete your registration</p>
    <p style="background-color: #fff; padding:10px"><a href="${url}">${url}</a></p>
    <hr style="background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 51%, rgba(255,255,255,0) 100%); height: 1px; border: none;" />
    <p>www.edu.lk</p>
    <p><strong>Thank you!!!.</strong></p>
    <p>Edu.lk Team</p>
    </div>`;

    
    let mailOprtions = {
        from: '"New Account | Edu.lk📧" <zedainnovations@gmail.com>',
        to: email,
        subject: `Edu.lk`,
        text: "Singup",
        html: singupTemplate,
    };

    transporter.sendMail(mailOprtions, (error, info) => {
        if (error) {
            return console.log(error.stack);
        }
        console.log('Email sendt!!!', info.messageId)
    });
    res.json({ message: 'email has been sent' });


});


app.post('/send-mail', async (req, res) => {
    let email = req.body.email;  
    let name =   req.body.name;
    let date =  req.body.date;
    let time =  req.body.time;
    let link =  req.body.link;
    const htmlTemplate = `
<h2
    style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; color:rgb(0, 136, 255); font-size: 30px; padding: 10px;">
    Hello ${name} 🤠!!!</h2><br />
<div style="background-color: rgb(7, 103, 167);">
    <h2 style="color: #ffffff;">Event : ABC</h2>
    <table width="600px">
        <tr style="background-color: rgb(255, 255, 255); text-align: left; padding: 10;">
            <td>Event Date</td>
            <td>${date}</td>

        </tr>
        <tr style="background-color: rgb(182, 182, 182); text-align: left">
            <td>Event Time</td>
            <td>${time}</td>
        </tr>
        <tr style="background-color: rgb(255, 255, 255); text-align: left">
            <td>Zoom Link</td>
            <td><a href={{link}}>Join</a></td>
        </tr>
    </table>
    <p style="text-align: center;">www.class.com</p>
</div>

`; 
    let mailOprtions = {
        from: '"New Event 📧" <project.esoft.shehan@gmail.com>',
        to: email,
        subject: `Hello ${name}`,
        text: "New event notification",
        html: htmlTemplate,
    };

    transporter.sendMail(mailOprtions, (error, info) => {
        if (error) {
            return console.log(error.stack);
        }
        console.log('Email sendt!!!', info.messageId)
    });
    res.json({ message: 'email has been sent' });


});

app.listen(process.env.SERVER_PORT, () => console.log('SERVER RUNNING... PORT [' + process.env.SERVER_PORT + ']'));