const express = require('express');
const asyncify = require('express-asyncify');
var moment = require('moment');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

const { socket } = require('../../socket');

let services, Sensor, Incubacion;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Sensor = services.Sensor
        Incubacion = services.Incubacion
    }

    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.use('*/:data', (req, res, next) => {

    const { data } = req.params;

    Controller.recivedDataSensor(data, Sensor)

    next()
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user; // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";


    Controller.dataMonitoreo(Incubacion)
        .then(data => {
            res.render('links/monitoreo', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

module.exports = router;