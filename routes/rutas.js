const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/enviar1/:mensaje/:asunto', async (req, res) => {
    console.log(req.params.mensaje, '  ', req.params.asunto);
    var jsonData = `{"Correo":[{"mensaje":"${req.params.mensaje}"},{"asunto":"${req.params.asunto}"}]}`;
    
    var jsonParsed = JSON.parse(jsonData);
    res.json(jsonParsed);
});
router.get('/enviar/:mensaje/:asunto/', async (req, res) => {
    console.log(req.params.mensaje, '  ', req.params.asunto);
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var mailAccountUser = 'pruebashector12@gmail.com'
    var mailAccountPassword = 'Haloreach21'

    var fromEmailAddress = 'pruebashector12@gmail.com'
    var toEmailAddress = 'nandohector1@gmail.com'

    var transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: mailAccountUser,
            pass: mailAccountPassword
        },
        tls: { rejectUnauthorized: false }
    }))

    var mail = {
        from: fromEmailAddress,
        to: toEmailAddress,
        subject: req.params.asunto,
        text: req.params.mensaje,
        html: `<b>Un usuario a tenido problemas:</b><p>${req.params.mensaje}</p>`
    }

    transport.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Message sent: " + info.message);
            res.json(info.message);
        }

        transport.close();
    });
     /* verify connection configuration
    transport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });*/
    // const correo = require('../enviarCorreo');
    /*
    var nodemailer = require('nodemailer');

    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebashector12@gmail.com',
            pass: 'Haloreach21'
        }
    });

    var mensaje = "Hola desde nodejs...";

    var mailOptions = {
        from: 'pruebashector12@gmail.com',
        to: 'nandohector1@gmail.com',
        subject: 'Asunto Del Correo',
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json(error)
        } else {
            console.log('Email enviado: ' + info.response);
            res.json(info.response)
        }
    });
*/
});

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});
router.get('', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;