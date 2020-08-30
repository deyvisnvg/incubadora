'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupUsuarioModel(config) {
    const sequelize = db(config);

    return sequelize.define('usuarios', {
        id_usuario: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        usuario: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        modulo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}