'user strict'

const express = require ('express');
const router = express.Router();

//Rota padrão habilitada - para teste
router.get( '/', (req, res, next) =>{
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

module.exports = router;