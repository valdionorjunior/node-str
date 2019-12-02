'user strict'

const express = require ('express');
const router = express.Router();
const authService = require('../services/auth-services');

//importando o cotroller
const controller = require('../controllers/customer-controller');

// router.get( '/', controller.get);

// router.get( '/:slug', controller.getBySlug);//busca por parametro

// router.get( '/admin/:id', controller.getById);//busca por id - troquei a rita pois não pode haver 2 chamdas da mesma rota ( '/:slug' === '/:id' )

// router.get( '/tags/:tag', controller.getByTag);//busca por parametro

router.post( '/', controller.post);

router.post( '/authenticate', controller.authenticate);
// router.put( '/:id',/authenticate controller.put);

router.post( '/refresh-token',authService.authorize, controller.refreshToken);

// router.delete( '/:id', controller.delete);//caso queira passar via parametro
// router.delete( '/', controller.delete);

module.exports = router;