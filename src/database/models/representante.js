'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('representantes', {
        id_representante: {
            type: Sequelize.INTEGER,
            primaryKey: true
            // unique: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_persona: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}