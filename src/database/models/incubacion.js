'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupPersonaModel(config) {
    const sequelize = db(config);

    return sequelize.define('incubacion', {
        id_incubacion: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        fecha_ingreso: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fecha_salida: {
            type: Sequelize.DATE,
            allowNull: false
        },
        hora_ingreso: {
            type: Sequelize.TIME,
            allowNull: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        piso_inicio: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        piso_fin: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        cantidad_ingreso: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_pedido: {
            type: Sequelize.TEXT
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