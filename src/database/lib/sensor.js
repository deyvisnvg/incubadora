'use strict'

module.exports = (SensorModel, TipoSensorModel) => {

    // async function addtipoSensor(data) {
    //     return await TipoSensorModel.create(data);
    // }

    // async function findtipoSensorAll() {
    //     return await TipoSensorModel.findAll();
    // }

    async function findSensorTemperatura() {
        return SensorModel.findAll({
            attributes: ['nombre_sensor'], // Para seleccionar ese atributo específico que quiero retornar
            // group: ['type'], // Lo agrupamos por type
            where: { // Especificamos la condición
                estado: 'Activo'
            },
            include: [{ // Con include hacemos los join o la relación con la tabla
                attributes: [],
                model: TipoSensorModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                where: { // Especificamos la condición
                    tipo_sensor: 'TEMPERATURA'
                }
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        })
    }

    async function findSensorHumedad() {
        return SensorModel.findAll({
            attributes: ['nombre_sensor'], // group: ['type'], // Lo agrupamos por type
            where: { // Especificamos la condición
                estado: 'Activo'
            },
            include: [{ // Con include hacemos los join o la relación con la tabla
                attributes: [],
                model: TipoSensorModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                where: { // Especificamos la condición
                    tipo_sensor: 'HUMEDAD'
                }
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        })
    }


    return {
        findSensorTemperatura,
        findSensorHumedad
    }
}