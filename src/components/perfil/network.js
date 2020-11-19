const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Persona;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Persona = services.Persona;
        Representante = services.Representante;
        Usuario = services.Usuario;
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.showPerfil(user, Persona, Representante)
        .then(perfil => {
            console.log(perfil);
            res.render('links/perfil', { perfil, user });
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updatePerfil(id, req.body, Persona, Representante)
        .then(() => {
            req.session.success = "Su perfil se ha Modificado con éxito!";
            res.redirect('/perfil');
        })
        .catch(err => {
            req.session.message = err;
            console.log(err.message)
        })
})

router.get('/configuration', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.showConfigurationUser(user, Usuario)
        .then(data => {
            res.render('links/configurationUser', { data, user });
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.post('/configuration/edit/:id', secure.checkOwn, (req, res) => {
    const { id } = req.params;

    Controller.updateConfiguration(id, req.body, Usuario)
        .then(() => {
            req.session.success = "Su Cuenta se ha Modificado con éxito!";
            res.redirect('/perfil/configuration');
        })
        .catch(err => {
            console.log(err.message)
        })
})

module.exports = router;