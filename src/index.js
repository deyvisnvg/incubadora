'use strict'

const express = require('express');
const http = require('http');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieSession =  require('cookie-session');

const routerApi = require('./network/routes');
const socket = require('./socket');
const upload = require('./upload');

//Inicializamos
const app = express();

//Configuration de socket.io
const server = http.createServer(app);
socket.connect(server);

// Settings
const {config} = require('./config');

//Configuramos nuestro motor de plantillas
app.set('views', path.join(__dirname, 'views')); //Definimos la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //Nombre de la Plantilla principal, dentro de la carpeta layout
    layoutsDir: path.join(app.get('views'), 'layout'), //Defino la dirección de layout
    partialsDir: path.join(app.get('views'), 'partials'), //la carpeta partials son pedazos de código que podemos utilizarlos en nuestras vistas
    extname: '.hbs', //extension o nombre de nuestros archivos de handlebars
    helpers: require('./lib/handlebars') //Para ejecutar funciones por aparte, como por ejemplo procesar una fecha
}))
app.set('view engine', '.hbs'); //Con esto utilizamos el motor de plantillas con la extensión .hbs

//Midlewares
app.use(bodyParser.urlencoded({ extended: false })); //Para recibir parámetros en el body desde el cliente
app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    secret: "proyectogps-nodejs.sessionsecret!",
    name: "session2",
    keys: ['key1', 'key2'],
    maxAge: 24*60*60*1000
}));
// req.session.views = (req.session.views || 0) + 1;
// req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge       
// res.header({ //Podemos personalizar nuestro header de esta forma.
//     "custom-header": "Nuestro header personalizado",
// });

// Midlewares Upload de imagenes
app.use(upload);

// Global variables
app.use((req, res, next) => {
    app.locals.message = req.session.message; //variable global guardado con el nombre de "message"
    app.locals.success = req.session.success; //variable global guardado con el nombre de "success"
    // app.locals.user = req.user; //user = nombre con el cual se va ha guardar y hacerlo disponible en todas las vistas // variable global // relacionado con passport al momento de serializarlo "./lib/passport"
    next();
});

//Routes
routerApi(app);

//Configuramos nuestros archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Ejecutamos el Broker EMQ X
// eventBroker();

//Inicializamos nuestro servidor
function init() {
    server.listen(config.port, () => {
        console.log("Servidor iniciado en el puerto: " + config.host + ':' + config.port);
    })
}

init();