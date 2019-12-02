'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    /*
    //busta no banco
    //busca tudo mas posso buscar por uma prorpiedade find({title: "exemplo"}) se quero traze mais de uma op
    // fica find({}, "title slug price")
    return Product.find(
        {active : true},
        "title slug price"
        );
    */
   const res = await Product.find(
    {active : true},
    "title slug price"
    );
    return res;
}

exports.getBySlug = async(slug) =>{
    const res = await Product.findOne({
        slug: slug,//busca por slug => repasso um paramentro com o valor da busca
        active : true
    },"title description slug price tags");
    return res;
}

exports.getById = async(id) => {
    //busta no banco por ID
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tag) => { //consegue mesmo assim, ja filtra dentro do array de tags
    //busta no banco por ID
    const res = await Product.find({
        tags:tag
    }, 'title description prive slug tags');
    return res;
}

exports.create = async(data) => {
    let product = new Product(data);// abaixo outra forma de se passar porem de forma mais esmiuçada
    // let product = new Product();
    // product.title = req.body.title;
    
    //o save por padrao retorna uma promisse, que é o resultado
    await  product.save();
}

exports.update = async(id,data) =>{
    await Product.findByIdAndUpdate(id,{
        $set:{//valores para alteração
            title: data.title,
            description: data.description, 
            slug: data.slug, 
            price: data.price
        }
    });
}

exports.remove = async(id) =>{
    // Product.findOneAndRemove(req.params.id) //caso queira passar como parametro
    await Product.findOneAndRemove(id);//enviando pelo body o id para remover (recomendado)
}