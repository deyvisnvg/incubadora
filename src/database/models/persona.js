'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupPersonaModel(config) {
    const sequelize = db(config);

    return sequelize.define('personas', {
        dni_persona: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        nombres: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_nacimiento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        genero: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        direccion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        celular: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_usuario: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false, // Esto es para que no tenga problemas con las fechas.
        freezeTableName: true
    })
}