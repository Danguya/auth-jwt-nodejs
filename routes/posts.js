const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken,(req, res)=>{
    res.send({
        posts:{
            title:"Um simples teste post criado por Wilmy Danguya",
            description:"Aqui eu posso colocar um monte de bla la bla"
        }
    });
});


module.exports = router;