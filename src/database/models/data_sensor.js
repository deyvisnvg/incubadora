'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupEmpresaModel(config) {
    const sequelize = db(config);

    return sequelize.define('data_sensor', {
        id_dataSensor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_sensor: {
            type: Sequelize.INTEGER
        },
        nombre_sensor: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        valor: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        hora: {
            type: Sequelize.TIME,
            allowNull: false
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true // De esta manera, Sequelize inferirá que el nombre de la tabla es igual al nombre del modelo, sin ninguna modificación.
        })
}