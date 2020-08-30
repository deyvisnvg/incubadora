'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('incubadora', {
        id_incubadora: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_incubadora: {
            type: Sequelize.TEXT,
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