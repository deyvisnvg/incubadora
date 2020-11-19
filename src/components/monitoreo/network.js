const express = require('express');
const asyncify = require('express-asyncify');
var moment = require('moment');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error');

let services, Sensor, Incubacion, DataSensor, Pedido;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) {
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err));
        Sensor = services.Sensor;
        Incubacion = services.Incubacion;
        DataSensor = services.DataSensor;
        Pedido = services.Pedido;
        Persona = services.Persona;
    }

    next()
})

router.use('*/:data', (req, res, next) => {
    const { data } = req.params;
    Controller.recivedDataSensor(data, Sensor, DataSensor, req.session.contador)
    next()
})

//------------------------------ Usuario: Super Administrador ------------------------------//
router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.filtroMonitoreo(user, Pedido)
        .then(data => {
            if (user.modulo == 'Representante_Legal') {
                res.render('links/monitoreoRepresentante', { data, user });
            } else {
                res.render('links/monitoreo', { data, user });
            }
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })

})

router.post('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.dataMonitoreo(req.body, user, Incubacion, Pedido)
        .then(data => {
            if (user.modulo == 'Representante_Legal') {
                res.render('links/monitoreoRepresentante', { data, user });
            } else {
                res.render('links/monitoreo', { data, user });
            }
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

//------------------------------ Usuario: Representante Legal ------------------------------//
// router.get('/representante', secure.checkOwn, (req, res) => {
//     const user = req.session.user;
//     console.log(user);
//     req.session.success = "";
//     req.session.message = "";

//     Controller.filtroMonitoreoRepresentante(Persona, user.id_usuario)
//         .then(data => {
//             res.render('links/monitoreoRepresentante', { data, user });
//         })
//         .catch(err => {
//             console.log('[Error!]: ', err);
//         })
// })

module.exports = router;