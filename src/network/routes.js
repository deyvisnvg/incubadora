'use strict'

const authentication = require('../components/authentication/network');
const usuario = require('../components/user/network');
const monitoreo = require('../components/monitoreo/network');
const perfil = require('../components/perfil/network');
const incubadora = require('../components/incubadora/network');
const sensores = require('../components/sensores/network');
const empresa = require('../components/empresa/network');
const pedido = require('../components/pedido/network');

module.exports = app => {
    app.use('/login', authentication);
    app.use('/monitoreo', monitoreo)
    app.use('/usuario', usuario);
    app.use('/perfil', perfil);
    app.use('/incubadora', incubadora);
    app.use('/sensores', sensores);
    app.use('/empresa', empresa);
    app.use('/pedido', pedido);
}