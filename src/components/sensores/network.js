const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, TipoSensor, Incubadora, Sensor;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        TipoSensor = services.TipoSensor
        Incubadora = services.Incubadora
        Sensor = services.Sensor
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

// ==================== Request Sensor ==================== //

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    Controller.listSensor(Sensor)
        .then(data => {
            res.render('links/listSensor', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listIncubadoraTipoSensor(Incubadora, TipoSensor)
        .then(data => {
            res.render('links/addSensor', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.post('/add', (req, res) => {

    Controller.addSensor(req.body, Sensor)
        .then(() => {
            req.session.success = "Tipo Sensor registrado con éxito!";
            res.redirect('/sensores/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/sensores/add');
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editSensor(id, Sensor, Incubadora, TipoSensor)
        .then(data => {
            res.render('links/editSensor', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateSensor(id, req.body, Sensor)
        .then(() => {
            req.session.success = "Sensor modificado con exito";
            res.redirect('/sensores');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/sensores');
        })
})

// ==================== Request Tipo Sensor ==================== //

router.get('/tipoSensor', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    Controller.listTipoSensor(TipoSensor)
        .then(data => {
            res.render('links/listTipoSensor', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/tipoSensor/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    res.render('links/addTipoSensor', { user });
})

router.post('/tipoSensor/add', (req, res) => {
    Controller.addTipoSensor(req.body, TipoSensor)
        .then(() => {
            req.session.success = "Tipo Sensor registrado con éxito!";
            res.redirect('/sensores/tipoSensor/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/sensores/tipoSensor/add');
        })
})

router.get('/tipoSensor/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editTipoSensor(id, TipoSensor)
        .then(data => {
            res.render('links/editTipoSensor', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/tipoSensor/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateTipoSensor(id, req.body, TipoSensor)
        .then(() => {
            req.session.success = "Tipo de Sensor modificado con exito";
            res.redirect('/sensores/tipoSensor');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/sensores/tipoSensor');
        })
})

module.exports = router;