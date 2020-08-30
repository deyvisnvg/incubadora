'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupPersonaModel(config) {
    const sequelize = db(config);

    return sequelize.define('pedidos', {
        id_pedido: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        cantidad: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        comentario: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_pedido: {
            type: Sequelize.DATE,
            allowNull: false
        },
        hora_pedido: {
            type: Sequelize.TIME,
            allowNull: false
        },
        fecha_entrega: {
            type: Sequelize.DATE,
            allowNull: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_persona: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false, // Esto es para que no tenga problemas con las fechas.
        freezeTableName: true
    })
}