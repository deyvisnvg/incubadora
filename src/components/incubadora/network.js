const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Incubacion, Incubadora, Pedido;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Incubacion = services.Incubacion;
        Incubadora = services.Incubadora;
        Pedido = services.Pedido;
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

//------------------------------ incubacion ------------------------------//

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

    console.log(id);

    Controller.viewIncubacion(id, Incubacion, Pedido)
        .then(data => {
            let incubaciones = data.dataIncubacion;
            let pedido = data.dataPedido;
            res.render('links/viewIncubacion', { pedido, incubaciones, user });
        })
        .catch(err => {
            console.log('[Error!]:', err.message);
        })
})

//------------------------------ incidencia ------------------------------//

router.get('/incidencia', secure.checkOwn, (req, res) => {
    const user = req.session.user;  // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";

    res.render('links/listIncidencia', { user });

    // Controller.listIncubadora(Incubadora)
    //     .then(data => {
    //         res.render('links/listIncubadora', { data, user });
    //     })
    //     .catch(err => {
    //         console.log('[Error!]: ', err);
    //     })
})

router.get('/incidencia/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    res.render('links/addIncidencia', { user });
})


// router.get('/edit/:id', (req, res) => {
//     const user = req.session.user;
//     const { id } = req.params;
//     let dataId = id.split(" ");

//     Controller.editUser(dataId[0], dataId[1], Usuario, Persona)
//         .then(data => {
//             let usuario = data.usuario;
//             let persona = data.persona;
//             res.render('links/editUser', { usuario, persona, user });
//         })
//         .catch(err => {
//             console.log('[Error!]:', err.message);
//         })
// })

// router.post('/update/:id', (req, res) => {

//     const { id } = req.params;
//     let dataId = id.split(" ");

//     let ids = {
//         id_persona: dataId[0],
//         id_usuario: dataId[1]
//     }

//     Controller.updateUser(ids, req.body, req.file, Usuario, Persona)
//         .then(() => {
//             req.session.success = "El usuario se ha modificado con exito";
//             res.redirect('/usuario');
//         })
//         .catch(err => {
//             console.error('[Error!]:', err);
//             req.session.message = err;
//             res.redirect('/usuario');
//         })
// })

// router.get('/add', secure.checkOwn, (req, res) => {
//     const user = req.session.user;
//     req.session.success = "";
//     req.session.message = "";

//     res.render('links/addProducto', { user });
// })

module.exports = router;