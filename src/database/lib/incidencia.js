'use strict'

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (IncidenciaModel, IncubacionModel, IncubadoraModel) => {

    async function addIncidencia(data) {
        return await IncidenciaModel.create(data);
    }

    async function findIncidenciaById(id_incidencias) {
        const resultado = await IncidenciaModel.findOne({
            where: {
                id_incidencias
            },
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return resultado;
    }

    async function findIncidenciaByIncubacionId(id_incubacion) {
        const resultado = await IncidenciaModel.findAll({
            where: {
                id_incubacion
            },
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return resultado;
    }

    function formatoResultado(resultado) {
        let dataFilter = resultado.filter(m => m['incubacion.incubadora.id_incubadora'] != null)

        let data = dataFilter.map(m => {
            let datos = {
                id_incidencias: m.id_incidencias,
                descripcion: m.descripcion,
                cantidad_defectuosos: m.cantidad_defectuosos,
                fecha_registrada: m.fecha_registrada,
                estado: m['incubacion.estado'],
                cantidad_ingreso: m['incubacion.cantidad_ingreso'],
                nombre_incubadora: m['incubacion.incubadora.nombre_incubadora'],
            }
            return datos;
        })
        return data;
    }

    async function findIncidenciaAllReport() {
        const resultado = await IncidenciaModel.findAll({
            include: [{
                attributes: ['estado', 'cantidad_ingreso'],
                model: IncubacionModel,
                include: [{
                    attributes: ['nombre_incubadora'],
                    model: IncubadoraModel,
                }]
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        let data = formatoResultado(resultado);
        return data;
    }

    async function findIncidenciaByFiltroReport(id_incubadora, fechaInicio, fechaFin) {
        let condicion = {};
        let condicion_to = {};

        if (id_incubadora != "" && fechaInicio != "" && fechaFin != "") {
            condicion = {
                fecha_registrada: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            };
            condicion_to = { id_incubadora };
            // console.log(condicion);
            // console.log(condicion_to);
        } else if (id_incubadora != "" && fechaInicio != "") {
            condicion = {
                fecha_registrada: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            };
            condicion_to = { id_incubadora };
        } else if (fechaInicio != "" && fechaFin != "") {
            condicion = {
                fecha_registrada: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            };
            condicion_to = {
                id_incubadora: {
                    [Op.not]: null,
                }
            };
        } else if (id_incubadora != "") {
            condicion = {
                id_incidencias: {
                    [Op.not]: null,
                }
            };
            condicion_to = { id_incubadora };
        } else {
            condicion = {
                id_incidencias: {
                    [Op.not]: null,
                }
            };
            condicion_to = {
                id_incubadora: {
                    [Op.not]: null,
                }
            };
        }

        const resultado = await IncidenciaModel.findAll({
            where: condicion,
            include: [{
                attributes: ['estado', 'cantidad_ingreso'],
                model: IncubacionModel,
                include: [{
                    attributes: ['nombre_incubadora'],
                    model: IncubadoraModel,
                    where: condicion_to,
                }]
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        let data = formatoResultado(resultado);
        return data;
    }

    async function updateSensorById(id_sensor, Sensor) {
        const cond = {
            where: {
                id_sensor
            }
        }

        return await SensorModel.update(Sensor, cond)
    }

    async function updateIncidencia(id_incidencias, Incidencia) {
        const cond = {
            where: {
                id_incidencias
            }
        }

        return await IncidenciaModel.update(Incidencia, cond)
    }


    return {
        addIncidencia,
        findIncidenciaById,
        findIncidenciaByIncubacionId,
        findIncidenciaAllReport,
        findIncidenciaByFiltroReport,
        updateSensorById,
        updateIncidencia
    }
}