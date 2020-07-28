'use strict'

//Vamos a definir como crear el objeto sequelize, para despues crear con este objeto nuestros modelos

const Sequelize = require('sequelize');

let sequelize = null

module.exports = function setupDatabase(config) {
    if (!sequelize) {
        sequelize = new Sequelize(config);
    }

    return sequelize;
}