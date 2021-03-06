const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Empresa;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Empresa = services.Empresa
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listEmpresa(Empresa)
        .then(data => {
            res.render('links/listEmpresa', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/empresa');
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editEmpresa(id, Empresa)
        .then(data => {
            res.render('links/editEmpresa', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateEmpresa(id, req.body, Empresa)
        .then(() => {
            req.session.success = "La Empresa se ha modificado con exito";
            res.redirect('/empresa');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/empresa');
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    res.render('links/addEmpresa', { user });
})

router.post('/add', (req, res) => {
    Controller.addEmpresa(req.body, Empresa)
        .then(() => {
            req.session.success = "Empresa registrado con éxito!";
            res.redirect('/empresa/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/empresa/add');
        })
})

module.exports = router;