const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Pedido, Representante, Persona;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Representante = services.Representante;
        Pedido = services.Pedido;
        Persona = services.Persona;
        Empresa = services.Empresa;
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listPedido(Pedido)
        .then(data => {
            res.render('links/listPedido', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.dataEnvio(Representante)
        .then(data => {
            res.render('links/addPedido', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message)
        })
})

router.post('/add', (req, res) => {

    Controller.addPedido(req.body, Pedido)
        .then(() => {
            req.session.success = "Pedido registrado con éxito!";
            res.redirect('/pedido/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/pedido/add');
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editPedido(id, Pedido, Representante, Empresa)
        .then(data => {
            res.render('links/editPedido', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

// router.get('/edit/:id', (req, res) => {
//     const user = req.session.user;
//     const { id } = req.params;

//     Controller.editPedido(id, Pedido)
//         .then(data => {
//             res.render('links/editPedido', { data, user });
//         })
//         .catch(err => {
//             console.log('[Error!]:', err.message);
//         })
// })

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updatePedido(id, req.body, Pedido)
        .then(() => {
            req.session.success = "El pedido se ha modificado con exito";
            res.redirect('/pedido');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/pedido');
        })
})

module.exports = router;