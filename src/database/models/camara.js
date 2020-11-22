'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupCamaraModel(config) {
    const sequelize = db(config);

    return sequelize.define('camara', {
        id_camara: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ip_camara: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_incubadora: {
            type: Sequelize.INTEGER
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}