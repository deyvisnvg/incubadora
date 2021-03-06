'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('incidencias', {
        id_incidencias: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        cantidad_nacidos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cantidad_defectuosos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fecha_registrada: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id_incubacion: {
            type: Sequelize.TEXT
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}