//serviço para envio de e-mail

'use strict'
let config = require('../config');
// let sendgrid = require('sendgrid')(config.sendGridKey);
//api sendgrid nova
let sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(config.sendGridKey);

exports.send = async(to, subject, body) =>{
    sendgrid.send({
        to: to,
        from: 'testenode@juniorltda.com',
        subject: subject,
        text: "Texto meramente ficticio!! so pra testar mesmo pois se tentar enviar em branco não envia o e-mail",
        html: body + 'Este é um e-mail de teste enviado de uma api Node.js\nTeste de e-mail no meu projetinho de nodeJs'
    });
}
