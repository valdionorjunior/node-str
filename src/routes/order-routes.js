'user strict'

const express = require ('express');
const router = express.Router();
const authService = require('../services/auth-services');

//importando o cotroller
const controller = require('../controllers/order-controller');

router.get( '/', authService.authorize, controller.get);

// router.get( '/:slug', controller.getBySlug);//busca por parametro

// router.get( '/admin/:id', controller.getById);//busca por id - troquei a rita pois não pode haver 2 chamdas da mesma rota ( '/:slug' === '/:id' )

// router.get( '/tags/:tag', controller.getByTag);//busca por parametro

router.post( '/', authService.authorize, controller.post);

// router.put( '/:id', controller.put);

// router.delete( '/:id', controller.delete);//caso queira passar via parametro
// router.delete( '/', controller.delete);

module.exports = router;