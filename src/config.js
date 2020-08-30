'use strict'

// const debug = require('debug')('proyectogps:db:setup') // Aqui le digo que muestre específicamente en que modulo o archivo estoy haciendo debug // El modulo de debug me permite tener mensajes de logs que yo voya a imprimir en pantalla, siempre en cuando yo tenga una variable de entorno configurada

module.exports = {
    config: {
        port: process.env.PORT || 5000,
        host: process.env.PORT || 'http://localhost',
        filesRoute: process.env.FILES_ROUTE || '/photos',
        filesRouteImg: process.env.FILES_ROUTEIMG || '/img'
    },

    configDb: {
        database: process.env.DB_NAME || 'admin_incubadora', // Vamos a pasar valores como si fueran variables de entorno por defecto
        username: process.env.DB_USER || 'admin_incubadora',
        password: process.env.DB_PASS || 'nethack',
        host: process.env.DB_HOST || 'proyectogpsmqtt.ml',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        dialect: 'mysql', // Es una propiedad de sequelite que es el dialecto. Si en algun momento deseamos migrar a mysql, simplement cambiar este dialecto.
        logging: false
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'proyectogps-nodejs-secret!',
    },

    // configDbFlash: {
    //     host: process.env.DATABASE_HOST || 'proyectogpsmqtt.ml',
    //     user: process.env.DATABASE_USER || 'admin_proyecto',
    //     password: process.env.DATABASE_PASSWORD || 'nethack',
    //     database: process.env.DATABASE_NAME || 'admin_proyecto'
    // }
}