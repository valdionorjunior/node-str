'use-strict'

const ValidationContract = require('../validators/fluent-validator');
//repository
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-services');

exports.get = async(req, res, next) => {
   try{
       var data = await repository.get();
       res.status(200).send(data);
   }catch(error){   
       res.status(500).send({
           message: 'Falha ao processar sua requisição',
           error
        });
   }
}

exports.post = async(req, res, next) => {
    try {
        //recupera o token 
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //Decodifica o token
        const data = await authService.decodeToken(token);

       await repository.create({    
            // customer: req.body.customer,
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Pedido enviado ao banco e cadastrado com sucesso!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha no envio ao banco e cadastro do pedido.',
            error
        });
    }
};