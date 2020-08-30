'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('representantes', {
        id_representante: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        cargo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_persona: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_empresa: {
            type: Sequelize.INTEGER
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}