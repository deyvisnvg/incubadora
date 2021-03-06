const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Incubacion, Incubadora, Pedido, Incidencia;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Incubacion = services.Incubacion;
        Incubadora = services.Incubadora;
        Pedido = services.Pedido;
        Incidencia = services.Incidencia;
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

//------------------------------ incubadora ------------------------------//

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    Controller.listIncubadora(Incubadora)
        .then(data => {
            res.render('links/listIncubadora', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    res.render('links/addIncubadora', { user });
})

router.post('/add', (req, res) => {
    Controller.addIncubadora(req.body, Incubadora)
        .then(() => {
            req.session.success = "Incubadora registrado con éxito!";
            res.redirect('/incubadora/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/incubadora/add');
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editIncubadora(id, Incubadora)
        .then(data => {
            res.render('links/editIncubadora', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateIncubadora(id, req.body, Incubadora)
        .then(() => {
            req.session.success = "La Incubadora se ha modificado con exito";
            res.redirect('/incubadora');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/incubadora');
        })
})

//------------------------------ incubación ------------------------------//

router.get('/incubacion', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    Controller.listIncubacion(Incubacion)
        .then(data => {
            res.render('links/listIncubacion', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/incubacion/add', secure.checkOwn, (req, res) => { //Falta--
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.dataEnvioIncubacion(Incubadora, Pedido)
        .then(data => {
            res.render('links/addIncubacion', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.post('/incubacion/add', (req, res) => {

    Controller.addIncubacion(req.body, Incubacion)
        .then(() => {
            req.session.success = "Incubación registrado con éxito!";
            res.redirect('/incubadora/incubacion/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/incubadora/incubacion/add');
        })
})

router.get('/incubacion/view/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;
    req.session.success = "";
    req.session.message = "";

    Controller.viewIncubacion(id, Incubacion, Pedido)
        .then(data => {
            res.render('links/viewIncubacion', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.get('/incubacion/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editIncubacion(id, Incubacion, Incubadora, Pedido)
        .then(data => {
            res.render('links/editIncubacion', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/incubacion/update/:id', (req, res) => {
    const { id } = req.params;
    let dataId = id.split("&");

    let ids = {
        id_incubacion: dataId[0],
        id_pedido: dataId[1]
    }

    Controller.updateIncubacion(ids.id_incubacion, req.body, Incubacion)
        .then(() => {
            req.session.success = "La incubación se ha modificado con exito";
            res.redirect('/incubadora/incubacion/view/' + ids.id_pedido);
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/incubadora/incubacion/view/' + ids.id_pedido);
        })
})
//------------------------------ incidencia ------------------------------//

router.get('/incidencia/list/:id', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    const { id } = req.params;

    console.log(id);

    Controller.listIncidencia(id, Incidencia)
        .then(data => {
            res.render('links/listIncidencia', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/incidencia/add/:id', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    const { id } = req.params;
    let dataId = id.split("&");

    let ids = {
        id_incubacion: dataId[0],
        id_pedido: dataId[1]
    }
    console.log(ids);

    res.render('links/addIncidencia', { ids, user });
})

router.post('/incidencia/add', (req, res) => {
    const data = req.body;

    Controller.addIncidencia(req.body, Incidencia)
        .then(() => {
            req.session.success = "Incidencia registrado con éxito!";
            res.redirect('/incubadora/incidencia/add/' + data.id_incubacion + '&' + data.id_pedido);
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/incubadora/add');
        })
})

router.get('/incidencia/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editIncidencia(id, Incidencia)
        .then(data => {
            res.render('links/editIncidencia', { data, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

router.post('/incidencia/update/:id', (req, res) => {
    const { id } = req.params;
    let dataId = id.split("&");

    let ids = {
        id_incubacion: dataId[0],
        id_pedido: dataId[1]
    }

    Controller.updateIncidencia(req.body, Incidencia)
        .then(() => {
            req.session.success = "Incidencia Actualizado con éxito!";
            res.redirect('/incubadora/incidencia/list/' + ids.id_incubacion + '&' + ids.id_pedido);
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/incubadora/add');
        })
})

module.exports = router;