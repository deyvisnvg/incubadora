const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Camara, Incubadora;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Camara = services.Camara;
        Incubadora = services.Incubadora;
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

//------------------------------ incubadora ------------------------------//

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    Controller.listCamara(Camara)
        .then(data => {
            res.render('links/listCamara', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.dataAddCamara(Incubadora)
        .then(data => {
            res.render('links/addCamara', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.post('/add', (req, res) => {
    Controller.addCamara(req.body, Camara)
        .then(() => {
            req.session.success = "Cámara registrado con éxito!";
            res.redirect('/camara/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/camara/add');
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editCamara(id, Camara, Incubadora)
        .then(data => {
            res.render('links/editCamara', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateCamara(id, req.body, Camara)
        .then(() => {
            req.session.success = "La Cámara se ha modificado con exito";
            res.redirect('/camara');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/Camara');
        })
})

module.exports = router;