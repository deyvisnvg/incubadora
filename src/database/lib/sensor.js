'use strict'

module.exports = (SensorModel, TipoSensorModel, IncubadoraModel) => {

    async function addSensor(data) {
        return await SensorModel.create(data);
    }

    async function findSensorAll() {

        const sensor = await SensorModel.findAll({
            attributes: ['id_sensor', 'nombre_sensor', 'estado'],
            include: [
                {
                    attributes: ['id_incubadora', 'nombre_incubadora'],
                    model: IncubadoraModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                    where: {
                        estado: 'Activo'
                    }
                },
                {
                    attributes: ['id_tipoSensor', 'tipo_sensor'],
                    model: TipoSensorModel
                }
            ],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return sensor;
    }

    async function findSensorTemperatura() {
        return SensorModel.findAll({
            attributes: ['id_sensor'], // Para seleccionar ese atributo específico que quiero retornar
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
            attributes: ['id_sensor'], // group: ['type'], // Lo agrupamos por type
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

    async function findSensorById(id_sensor) {
        const sensor = await SensorModel.findOne({
            attributes: ['id_sensor', 'nombre_sensor', 'estado'],
            where: {
                id_sensor
            },
            include: [
                {
                    attributes: ['id_incubadora', 'nombre_incubadora'],
                    model: IncubadoraModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                },
                {
                    attributes: ['id_tipoSensor', 'tipo_sensor'],
                    model: TipoSensorModel
                }
            ],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return sensor;
    }

    async function updateSensorById(id_sensor, Sensor) {
        const cond = {
          where: {
            id_sensor
          }
        }
    
        return await SensorModel.update(Sensor, cond)
      }


    return {
        addSensor,
        findSensorAll,
        findSensorTemperatura,
        findSensorHumedad,
        findSensorById,
        updateSensorById
    }
}