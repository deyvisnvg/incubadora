const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Usuario, Persona;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Persona = services.Persona
        Usuario = services.Usuario
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listUser(user.modulo, Persona)
        .then(data => {
            res.render('links/listUser', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;
    let dataId = id.split(" ");

    Controller.editUser(dataId[0], dataId[1], Usuario, Persona)
        .then(data => {
            let usuario = data.usuario;
            let persona = data.persona;
            res.render('links/editUser', { usuario, persona, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/update/:id', (req, res) => {

    const { id } = req.params;
    let dataId = id.split(" ");

    let ids = {
        id_persona: dataId[0],
        id_usuario: dataId[1]
    }

    Controller.updateUser(ids, req.body, req.file, Usuario, Persona)
        .then(() => {
            req.session.success = "El usuario se ha modificado con exito";
            res.redirect('/usuario');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/usuario');
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    res.render('links/addUser', { user });
})

router.post('/add', (req, res) => {
    Controller.registroUser(req.body, Usuario)
        .then(() => {
            req.session.success = "Usuario registrado con éxito!";
            res.redirect('/usuario/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/usuario/add');
        })
})

module.exports = router;