'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: { //referencia a um squema dentro do banco
        type: mongoose.Schema.Types.ObjectId,//apontamento par ao banco
        ref: 'Customer'//id de referencia pra schema dentro do MongoDB
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        enum:['create','done'],
        default: 'create'   
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        products: { //referencia a um squema dentro do banco
            type: mongoose.Schema.Types.ObjectId,//apontamento par ao banco
            ref: 'Products'//id de referencia pra schema dentro do MongoDB
        }
    }],
});

module.exports = mongoose.model('Order', schema);