'use strict'

const formatDate = {};

formatDate.generate = () => {
    let codigo = + new Date() + Math.floor(Math.random() * 1000);
    return "reporte_" + codigo;
}

module.exports = formatDate;