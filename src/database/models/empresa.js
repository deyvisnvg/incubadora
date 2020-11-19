'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupEmpresaModel(config) {
    const sequelize = db(config);

    return sequelize.define('empresa', {
        ruc_empresa: {
            type: Sequelize.TEXT,
            primaryKey: true
            // unique: false
        },
        nombre_empresa: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        direccion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        celular: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        telefono: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_registro: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true // De esta manera, Sequelize inferirá que el nombre de la tabla es igual al nombre del modelo, sin ninguna modificación.
        })
}