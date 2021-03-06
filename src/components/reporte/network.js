const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error');

let services, Persona, Pedido, Empresa, Incubacion, Incubadora, Incidencia, DataSensor, TipoSensor;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Persona = services.Persona;
        Pedido = services.Pedido;
        Empresa = services.Empresa;
        Incubacion = services.Incubacion;
        Incubadora = services.Incubadora;
        Incidencia = services.Incidencia;
        TipoSensor = services.TipoSensor;
        DataSensor = services.DataSensor;
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/replegal', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listRepresentanteAll(Persona)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteRepLegal', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/replegal');
        })
})

router.post('/replegal', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listRepresentanteEstado(req.body, Persona)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteRepLegal', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/replegal');
        })
})

// ==================== Reporte Pedidos ==================== //
router.get('/pedido', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listPedidoAll(Pedido, Empresa)
        .then(data => {
            req.session.dataTemp = data.filtro;
            // console.log(req.session.dataTemp);
            res.render('links/reportePedido', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/pedido');
        })
})

router.post('/pedido', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listPedidoFiltro(req.body, Pedido, Empresa)
        .then(data => {
            req.session.dataTemp = data.filtro;
            // console.log(req.session.dataTemp);
            res.render('links/reportePedido', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/pedido');
        })
})

// ==================== Reporte Incubación ==================== //
router.get('/incubacion', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listIncubacionAll(Incubacion, Pedido, Incubadora, Empresa)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteIncubacion', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/incubacion');
        })
})

router.post('/incubacion', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listIncubacionFiltro(req.body, Incubacion, Pedido, Incubadora, Empresa)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteIncubacion', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/incubacion');
        })
})

// ==================== Reporte temperatura y humedad por modulo ==================== //
router.get('/temphumedad', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listTempHumedadAll(Incubacion, Incubadora)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteTempHumedad', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/temphumedad');
        })
})

router.post('/temphumedad', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listTempHumedadFiltro(req.body, Incubacion, Incubadora)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteTempHumedad', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/temphumedad');
        })
})

// ==================== Reporte sensores ==================== //
router.get('/sensores', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listSensoresAll(DataSensor, TipoSensor)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteSensores', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/sensores');
        })
})

router.post('/sensores', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listSensoresFiltro(req.body, DataSensor, TipoSensor)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteSensores', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/sensores');
        })
})

// ==================== Reporte incidencias ==================== //
router.get('/incidencia', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listIncidenciaAll(user.usuario, Incidencia, Incubadora)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteIncidencia', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/incidencia');
        })
})

router.post('/incidencia', (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listIncidenciaFiltro(user.usuario, req.body, Incidencia, Incubadora)
        .then(data => {
            req.session.dataTemp = data.filtro;
            //console.log(req.session.dataTemp);
            res.render('links/reporteIncidencia', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/incidencia');
        })
})


// ==================== Reporte Exportar ==================== //
router.get('/dataExport', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    //let reqData = req.session.datas
    let reqData = req.session.dataTemp
    let url, urlRedirect;

    if (typeof reqData != 'undefined') {
        if (reqData.reporte == 'representante') {
            url = 'reporteRepLegal';
            urlRedirect = 'replegal';
        }
        if (reqData.reporte == 'pedido') {
            url = 'reportePedido';
            urlRedirect = 'pedido';
        }
        if (reqData.reporte == 'incubacion') {
            url = 'reporteIncubacion';
            urlRedirect = 'incubacion';
        }
        if (reqData.reporte == 'incidencia') {
            url = 'reporteIncidencia';
            urlRedirect = 'incidencia';
        }
        if (reqData.reporte == 'sensores') {
            url = 'reporteSensores';
            urlRedirect = 'sensores';
        }
        if (reqData.reporte == 'temperatura_Humedad_por_modulo') {
            url = 'reporteTempHumedad';
            urlRedirect = 'temphumedad';
        }
    }

    Controller.listDataExport(user.usuario, reqData, DataSensor,TipoSensor,Persona, Pedido, Empresa, Incubacion, Incubadora, Incidencia)
        .then(data => {
            res.render('links/' + url, { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/' + urlRedirect);
        })
})

router.get('/exportar', (req, res) => {
    req.session.success = "";
    req.session.message = "";

    let reqData = req.session.dataTemp

    Controller.exportDataToExcel(reqData,Persona,Pedido,Incubacion,Incidencia,DataSensor)
        .then(nameFile => {
            req.session.success = "Se ha Exportado con exito " + nameFile;
            res.redirect('/reporte/dataExport');
        })
        .catch(err => {
            console.log('[Error!]: ', err);
            req.session.message = err;
            res.redirect('/reporte/dataExport');
        })
})


module.exports = router;