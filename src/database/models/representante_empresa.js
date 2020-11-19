'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupIncubadoraModel(config) {
    const sequelize = db(config);

    return sequelize.define('representante_empresa', {
        id_representante_empresa: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_representante: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_empresa: {
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