'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('tipo_sensor', {
        id_tipoSensor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        tipo_sensor: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        simbolo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        limite: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        ambiente: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}