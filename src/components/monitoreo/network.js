const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Usuario, Producto;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Producto = services.Producto
        Usuario = services.Usuario
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})


router.get('/:data', secure.checkOwn, (req, res) => {
    const user = req.session.user; // Obtengo el user(que es un objeto de datos del usuario logeado) guardado en la cookies para definir el menú del usuario según su módulo
    req.session.success = "";
    req.session.message = "";
    const { data } = req.params;
    let m = data.split('&')

    let datos = {
        temperatura: m[0],
        humedad: m[1]
    }

    console.log(datos)

    Controller.dataMonitoreo(datos)
    .then(data => {
        res.render('links/monitoreo', { user });
    })
    .catch(err => {
        console.log('[Error!]: ', err);
    })

})

module.exports = router;