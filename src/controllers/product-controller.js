'use-strict'

// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
//repository
const repository = require('../repositories/product-repository');
//module para trabalhar com azure
const azure = require('azure-storage');
//module Guid
const guid = require('guid');
//moulo de configurçoes
const config = require('../config');



exports.get = async(req, res, next) => {
    
    /*bloco tranferido para repository
        //busta no banco
        //busca tudo mas posso buscar por uma prorpiedade find({title: "exemplo"}) se quero traze mais de uma op
        // fica find({}, "title slug price")
        Product.find({active : true},"title slug price")
    */
   /* antes de ser assincrono
   repository.get()
    .then(data =>{
        //se deu certo envia na resposta uma mensagem
        res.status(200).send(data);
    })
    .catch(error => {
        res.status(400).send(error);
    });
    */
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

exports.getBySlug = async(req, res, next) => {
    /*bloco tranferido para repository
    //busta no banco
    //busca tudo mas posso buscar por uma prorpiedade find({title: "exemplo"}) se quero traze mais de uma op
    // fica find({}, "title slug price")
    Product.findOne({
        slug: req.params.slug,//busca por slug => repasso um paramentro com o valor da busca
        active : true
    },"title description slug price tags")
    */
    // repository.getBySlug(req.params.slug)
    // .then(data =>{
    //     //se deu certo envia na resposta uma mensagem
    //     res.status(200).send(data);
    // })
    // .catch(error => {
    //     res.status(400).send(error);
    // });
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error
        });
    }
}

exports.getById = async(req, res, next) => {
    /*bloco tranferido para repository
    //busta no banco por ID
    Product.findById(req.params.id)
    */
//    repository.getById(req.params.id)
//     .then(data =>{
//         //se deu certo envia na resposta uma mensagem
//         res.status(200).send(data);
//     })
//     .catch(error => {
//         res.status(400).send(error);
//     });
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error
        });
    }
}

exports.getByTag = async(req, res, next) => { //consegue mesmo assim, ja filtra dentro do array de tags
     /*bloco tranferido para repository
    //busta no banco por ID
    Product.find({
        tags:req.params.tag
    }, 'title description prive slug tags')
    */
    // repository.getByTag(req.params.tag)
    // .then(data =>{
    //     //se deu certo envia na resposta uma mensagem
    //     res.status(200).send(data);
    // })
    // .catch(error => {
    //     res.status(400).send(error);
    // });
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error
        });
    }
}

exports.post = async(req, res, next) => {

    //Validaçoes de campos
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'Titulo deve conter pelo menos 3 caracteres!');
    contract.hasMinLen(req.body.description, 3, 'Descrição deve conter pelo menos 3 caracteres!');
    contract.hasMinLen(req.body.slug, 3, 'Slug deve conter pelo menos 3 caracteres!');

        //se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }

    //validações fim

    /*bloco tranferido para repository
    let product = new Product(req.body);// abaixo outra forma de se passar porem de forma mais esmiuçada
    // let product = new Product();
    // product.title = req.body.title;
    
    //o save por padrao retorna uma promisse, que é o resultado
    product.save()
    */
    // repository.create(req.body)
    // .then(data =>{
    //     //se deu certo envia na resposta uma mensagem
    //     res.status(201).send({message:'Enviado ao banco e cadastrado com sucesso!'});
    // })
    // .catch(error => {
    //     res.status(400).send({message:'Falha no envio ao banco e cadastro do produto', data: error});
    // });
    try {
        //Cria o Blob Service
        const blobSvc = azure.createBlobService(config.userImagesBlobConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        //salvando imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType : type
        }, function (error, result, response){
            if(error){
                filename = 'default-product.png'
            }
        });

        // await repository.create(req.body);   
        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://valdionorjs.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({
            message: 'Enviado ao banco e cadastrado com sucesso!'
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'Falha no envio ao banco e cadastro do produto',
            error
        });
    }
};

exports.put = async(req, res, next) =>{
    /*bloco tranferido para repository
    Product.findByIdAndUpdate(req.params.id,{
        $set:{//valores para alteração
            title: req.body.title,
            description: req.body.description, 
            slug: req.body.slug, 
            price: req.body.price
        }
    })
    */
    // repository.update(req.params.id, req.body)
    // .then(data =>{
    //     //se deu certo envia na resposta uma mensagem
    //     res.status(200).send({message:'Produto alterado com sucesso!'});
    // })
    // .catch(error => {
    //     res.status(400).send({message:'Falha na alteração do produto', data: error});
    // });
    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message:'Produto alterado com sucesso!'
        });
    } catch (error) {
        res.status(400).send({
            message:'Falha na alteração do produto',
            error
        });
    }
};

exports.delete = async(req, res, next) =>{
    /*bloco tranferido para repository
    // Product.findOneAndRemove(req.params.id) //caso queira passar como parametro
    Product.findOneAndRemove(req.body.id)//enviando pelo body o id para remover (recomendado)
    */
    // repository.remove(req.body.id)
    // .then(data =>{
    //     //se deu certo envia na resposta uma mensagem
    //     res.status(200).send({message:'Produto Removido com sucesso!'});
    // })
    // .catch(error => {
    //     res.status(400).send({message:'Falha na remoção do produto', data: error});
    // });
    try {
        var data = await repository.remove(req.body.id);
        res.status(200).send({
            message:'Produto Removido com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message:'Falha na remoção do produto',
            error
        });
    }
};