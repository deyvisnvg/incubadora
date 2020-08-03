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

let services, Sensor;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Sensor = services.Sensor
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

    let fecha = new Date()

    var localDate = new Date();
    var localMoment = moment();
    var utcMoment = moment.utc();
    var utcDate = new Date(utcMoment.format());

    //These are all the same
    console.log('localData unix = ' + localDate.valueOf());
    console.log('localMoment unix = ' + localMoment.valueOf());
    console.log('utcMoment unix = ' + utcMoment.valueOf());

    //These formats are different
    console.log('localDate = ' + localDate);
    console.log('localMoment string = ' + localMoment.format());
    console.log('utcMoment string = ' + utcMoment.format());
    console.log('utcDate  = ' + utcDate);

    //One to show conversion
    console.log('localDate as UTC format = ' + moment.utc(localDate).format());
    console.log('localDate as UTC unix = ' + moment.utc(localDate).valueOf());

    res.render('links/monitoreo', { fecha, user });

    // Controller.dataMonitoreo(datos)
    //     .then(data => {
    //     })
    //     .catch(err => {
    //         console.log('[Error!]: ', err);
    //     })
})

module.exports = router;