'use-strict'

const ValidationContract = require('../validators/fluent-validator');
//repository
const repository = require('../repositories/customer-repository');
//MD5
const md5 = require('md5');
//serviço de envio de e-mail
const emailService = require('../services/email-service');
//modulo de autenticacao
const authService = require('../services/auth-services');

exports.post = async(req, res, next) => {

    //Validaçoes de campos
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'Nome deve conter pelo menos 3 caracteres!');
    contract.isEmail(req.body.email, 'E-mail invalido!');
    contract.hasMinLen(req.body.password, 6, 'Senha deve conter pelo menos 6 caracteres!');

        //se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }
    //validações fim

    try {
        // var data = await repository.create(req.body);
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles:["user"]
        });

        emailService.send(req.body.email, 
            '-Bem Vindo-',
            global.EMAIL_TMPL.replace('{0}', req.body.name));
            
        res.status(201).send({
            message: 'Cliente enviado ao banco e cadastrado com sucesso!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha no envio ao banco e cadastro do cliente.',
            error
        });
    }
};

exports.authenticate = async(req, res, next) => {

    try {
        // var data = await repository.create(req.body);
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)//encriptado com md5 + salt_key
        });

        if(!customer){
            res.status(404).send({
                message: 'Usuario ou senha invalida!',
            });
            return;
        }

        //gerando token
        const token = await authService.generateToken({
            id:customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });
            
        res.status(201).send({
            message: 'Cliente enviado ao banco e cadastrado com sucesso!',
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha no envio ao banco e cadastro do cliente.',
            error
        });
    }
};

exports.refreshToken = async(req, res, next) => {

    
    try {
        //recupera o token 
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        //Decodifica o token
        const data = await authService.decodeToken(token);
        // var data = await repository.create(req.body);
        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(404).send({
                message: 'Cliente não encontrado!',
            });
            return;
        }

        //gerando token
        const tokenD = await authService.generateToken({
            id:customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });
            
        res.status(201).send({
            token: tokenD,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha no envio ao banco e cadastro do cliente.',
            error
        });
    }
};