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
        Persona = services.Persona
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;

    Controller.showPerfil(user.id_usuario, Persona)
        .then(perfil => {
            res.render('links/perfil', { perfil, user });
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.get('/edit/:id', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editPersona(id, Persona)
        .then(perfil => {
            res.render('links/editPerfil', { perfil, user });
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updatePersona(id, req.file, req.body, Persona)
        .then(() => {
            res.redirect('/perfil');
        })
        .catch(err => {
            console.log(err.message)
        })
})

module.exports = router;