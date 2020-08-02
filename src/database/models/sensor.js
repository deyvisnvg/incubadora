'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('sensores', {
        id_sensor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_sensor: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_incubadora: {
            type: Sequelize.INTEGER
        },
        id_tipoSensor: {
            type: Sequelize.INTEGER
        }
    },
        {
            timestamps: false // Esto es para que no tenga problemas con las fechas.
        })
}