const { handleError } = require('../../error');

module.exports = {

    addSensor: (body, Sensor) => {
        return new Promise(async (resolve, reject) => {

            const newSensor = {
                nombre_sensor: body.nombre_sensor,
                estado: body.estado,
                id_incubadora: body.incubadora,
                id_tipoSensor: body.tipo_sensor,
            }

            // console.log(newSensor);

            await Sensor.addSensor(newSensor).catch(handleError);
            resolve();

        })
    },

    listSensor: (Sensor) => { //Continuar
        return new Promise(async (resolve, reject) => {
            const sensor = await Sensor.findSensorAll().catch(err => handleError(err));

            // console.log(sensor);
            resolve(sensor);
        })
    },

    listIncubadoraTipoSensor: (Incubadora, TipoSensor) => {
        return new Promise(async (resolve, reject) => {
            const incubadora = await Incubadora.findIncubadoraAllOn().catch(err => handleError(err));
            const tipoSensor = await TipoSensor.findtipoSensorAll().catch(err => handleError(err));

            let data = {};

            let dataTipoSensor = tipoSensor.map(m => {
                let dataTipoSensor = {
                    id_tipoSensor: m.id_tipoSensor,
                    tipo_sensor: m.tipo_sensor,
                }
                return dataTipoSensor;
            })

            data.dataIncubadora = incubadora;
            data.dataTipoSensor = dataTipoSensor;

            // console.log(data);
            resolve(data);
        })
    },

    editSensor: function (id_sensor, Sensor, Incubadora, TipoSensor) {
        return new Promise(async (resolve, reject) => {
            let data = {};

            if (!id_sensor) {
                reject("La id no se recibió");
                return false;
            }

            const incubadora = await Incubadora.findIncubadoraAllOn().catch(err => handleError(err));
            const tipoSensor = await TipoSensor.findtipoSensorAll().catch(err => handleError(err));
            const sensor = await Sensor.findSensorById(id_sensor).catch(err => handleError(err));

            let dataTipoSensor = tipoSensor.map(m => {
                let dataTipoSensor = {
                    id_tipoSensor: m.id_tipoSensor,
                    tipo_sensor: m.tipo_sensor,
                }
                return dataTipoSensor;
            })

            try {
                data.dataIncubadora = incubadora;
                data.dataTipoSensor = dataTipoSensor;
                data.sensor = sensor;
                console.log(data)
                resolve(data);
            } catch (err) {
                reject('Error! al editar, Inténtelo nuevamente.');
            }

        })
    },

    updateSensor: function (id_sensor, body, Sensor) {
        return new Promise(async (resolve, reject) => {
            const dataSensor = {
                nombre_sensor: body.nombre_sensor,
                estado: body.estado,
                id_incubadora: body.incubadora,
                id_tipoSensor: body.tipo_sensor,
            }

            try {
                await Sensor.updateSensorById(id_sensor, dataSensor);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

    //==================== Tipo sensor =====================//

    addTipoSensor: function (body, TipoSensor) {
        return new Promise(async (resolve, reject) => {

            const newTipoSensor = {
                tipo_sensor: body.tipo_sensor,
                simbolo: body.simbolo,
                limite: body.limite,
                ambiente: body.ambiente,
            }

            // console.log(newTipoSensor);

            await TipoSensor.addtipoSensor(newTipoSensor).catch(handleError);
            resolve();

        })
    },

    listTipoSensor: TipoSensor => {
        return new Promise(async (resolve, reject) => {
            const tipoSensor = await TipoSensor.findtipoSensorAll().catch(err => handleError(err));

            let data = tipoSensor.map(m => {
                let dataTipoSensor = {
                    id_tipoSensor: m.id_tipoSensor,
                    tipo_sensor: m.tipo_sensor,
                    simbolo: m.simbolo,
                    limite: m.limite,
                    ambiente: m.ambiente
                }
                return dataTipoSensor;
            })

            // console.log(data);
            resolve(data);
        })
    },

    editTipoSensor: function (id_tipoSensor, TipoSensor) {
        return new Promise(async (resolve, reject) => {

            if (!id_tipoSensor) {
                reject("La id no se recibió");
                return false;
            }

            try {
                const tipo_sensor = await TipoSensor.findTipoSensorById(id_tipoSensor);
                // console.log(tipo_sensor)
                resolve(tipo_sensor);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateTipoSensor: function (id_tipoSensor, body, TipoSensor) {
        return new Promise(async (resolve, reject) => {
            const dataTipoSensor = {
                tipo_sensor: body.tipo_sensor,
                simbolo: body.simbolo,
                limite: body.limite,
                ambiente: body.ambiente
            }

            try {
                await TipoSensor.updateTipoSensorById(id_tipoSensor, dataTipoSensor);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    }

}