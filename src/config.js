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
        password: process.env.DB_PASS || 'incubadora2022',
        host: process.env.DB_HOST || 'incubadora.ga',

        // database: process.env.DB_NAME || 'eanegoci_proytesis', // Vamos a pasar valores como si fueran variables de entorno por defecto
        // username: process.env.DB_USER || 'eanegoci_proytesis',
        // password: process.env.DB_PASS || '72l2obPU2p',
        // host: process.env.DB_HOST || 'eanegocios.com',

        // database: process.env.DB_NAME || 'incubadora', // Vamos a pasar valores como si fueran variables de entorno por defecto
        // username: process.env.DB_USER || 'root',
        // password: process.env.DB_PASS || 'nethack',
        // host: process.env.DB_HOST || 'localhost',
        
        
        // database: process.env.DB_NAME || 'incub4xh_monitoreo', // Vamos a pasar valores como si fueran variables de entorno por defecto
        // username: process.env.DB_USER || 'incub4xh',
        // password: process.env.DB_PASS || 'L6uJ5dLx0u0$1$9_',
        // host: process.env.DB_HOST || 'incubadoraac.com',
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