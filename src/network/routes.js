'use strict'

const authentication = require('../components/authentication/network');
const usuario = require('../components/user/network');
// const producto = require('../components/producto/network');
const monitoreo = require('../components/monitoreo/network');
const perfil = require('../components/perfil/network');
const incubadora = require('../components/incubadora/network');

module.exports = app => {
    app.use('/login', authentication);
    app.use('/monitoreo', monitoreo)
    app.use('/usuario', usuario);
    // app.use('/producto', producto);
    app.use('/perfil', perfil);
    app.use('/incubadora', incubadora);
}