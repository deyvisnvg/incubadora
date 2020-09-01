'use strict'

module.exports = (SensorModel, TipoSensorModel, IncubadoraModel) => {

    async function addSensor(data) {
        return await SensorModel.create(data);
    }

    async function findSensorAll() {
        return await IncubadoraModel.findAll({
            attributes: ['id_incubadora', 'nombre_incubadora'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                estado: 'Activo'
            },
            // as: "PersonaModel",
            // group: ['type'], // Lo agrupamos por type
            include: [{ // Con include hacemos los join o la relación con la tabla
                attributes: ['id_sensor', 'nombre_sensor', 'estado'],
                model: SensorModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                include: [{
                    attributes: ['id_tipoSensor', 'tipo_sensor'],
                    model: TipoSensorModel
                }]
                // order: [['id_sensor', 'ASC']]
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }

    async function findSensorTemperatura() {
        return SensorModel.findAll({
            attributes: ['id_sensor', 'nombre_sensor'], // Para seleccionar ese atributo específico que quiero retornar
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
            attributes: ['id_sensor', 'nombre_sensor'], // group: ['type'], // Lo agrupamos por type
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
        addSensor,
        findSensorAll,
        findSensorTemperatura,
        findSensorHumedad
    }
}