'use strict'

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (DataSensorModel, SensorModel, TipoSensorModel) => {

    async function addDataSensorTemp(data) {
        return await DataSensorModel.bulkCreate(data);
    }

    async function addDataSensorHum(data) {
        return await DataSensorModel.bulkCreate(data);
    }

    function formatoResultado(resultado) {
        let dataFilter = resultado.filter(m => m['sensore.tipo_sensor.id_tipoSensor'] != null)

        let data = dataFilter.map(m => {
            let datos = {
                id_dataSensor: m.id_dataSensor,
                valor: m.valor,
                fecha: m.fecha,
                hora: m.hora,
                nombre_sensor: m['sensore.nombre_sensor'],
                tipo_sensor: m['sensore.tipo_sensor.tipo_sensor'],
            }
            return datos;
        })
        return data;
    }

    async function findSensoresAllReport() {
        const resultado = await DataSensorModel.findAll({
            include: [{
                attributes: ['nombre_sensor'],
                model: SensorModel,
                include: [{
                    attributes: ['tipo_sensor'],
                    model: TipoSensorModel,
                }]
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        let data = formatoResultado(resultado);
        return data;
    }

    async function findSensoresByFiltroReport(id_tipoSensor, fechaInicio, fechaFin) {
        let condicion = {};
        let condicion_to = {};

        if (id_tipoSensor != "" && fechaInicio != "" && fechaFin != "") {
            condicion = {
                fecha: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            };
            condicion_to = { id_tipoSensor };
            // console.log(condicion);
            // console.log(condicion_to);
        } else if (id_tipoSensor != "" && fechaInicio != "") {
            condicion = {
                fecha: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            };
            condicion_to = { id_tipoSensor };
        } else if (fechaInicio != "" && fechaFin != "") {
            condicion = {
                fecha: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            };
            condicion_to = {
                id_tipoSensor: {
                    [Op.not]: null,
                }
            };
        } else if (id_tipoSensor != "") {
            condicion = {
                id_dataSensor: {
                    [Op.not]: null,
                }
            };
            condicion_to = { id_tipoSensor };
        } else {
            condicion = {
                id_dataSensor: {
                    [Op.not]: null,
                }
            };
            condicion_to = {
                id_tipoSensor: {
                    [Op.not]: null,
                }
            };
        }

        const resultado = await DataSensorModel.findAll({
            where: condicion,
            include: [{
                attributes: ['nombre_sensor'],
                model: SensorModel,
                include: [{
                    attributes: ['tipo_sensor'],
                    model: TipoSensorModel,
                    where: condicion_to
                }]
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        let data = formatoResultado(resultado);
        return data;
    }


    return {
        addDataSensorTemp,
        addDataSensorHum,
        findSensoresAllReport,
        findSensoresByFiltroReport
    }
}