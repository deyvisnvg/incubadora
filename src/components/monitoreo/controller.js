const { socket } = require('../../socket');
const { handleError } = require('../../error');
const { dateFormatYMD, dateFormatHms, dateFormatDMY } = require('../../dateFormatUtc');

module.exports = {

    recivedDataSensor: (data, Sensor, DataSensor) => {
        return new Promise(async (resolve, reject) => {

            let sensorTemp = null;
            let sensorHumed = null;
            let promedios = [];

            if (!sensorTemp) {
                sensorTemp = await Sensor.findSensorTemperatura().catch(err => handleError(err));
            }

            if (!sensorHumed) {
                sensorHumed = await Sensor.findSensorHumedad().catch(err => handleError(err));
            }

            // =====================================================================================
            // RECIBO DATOS DEL ARDUINO Y LOS ORDENO POR TEMPERATURAS, HUMEDAD Y PROMEDIOS DE AMBOS
            // =====================================================================================
            let m = data.split('&')

            let temperatura_s = m[0];
            let humedad_s = m[1];
            let proTempHumed_s = m[2];

            let temperatura = temperatura_s.split(',')
            let humedad = humedad_s.split(',')
            let proTempHumed = proTempHumed_s.split(',')

            let promedio = {
                proTemp: proTempHumed[0],
                proHum: proTempHumed[1]
            }

            // =====================================================================================
            // GUARDO CADA VALOR RECIBIDO DEL ARDUINO EN CADA SENSOR DE TEMP, HUM Y PROMEDIOS
            // =====================================================================================
            for (const i in sensorTemp) {
                sensorTemp[i].valor = temperatura[i]
                sensorTemp[i].fecha = dateFormatYMD();
                sensorTemp[i].hora = dateFormatHms();
            }

            for (const i in sensorHumed) {
                sensorHumed[i].valor = humedad[i]
                sensorHumed[i].fecha = dateFormatYMD();
                sensorHumed[i].hora = dateFormatHms();
            }

            promedios.push(promedio);

            // =====================================================================================

            console.log(temperatura)
            console.log(humedad)
            console.log(proTempHumed)

            console.log("------------")

            let datos = {
                sensorTemp,
                sensorHumed,
                promedios
            }

            console.log(datos)

            socket.io.emit("sensores", datos)

            // setTimeout(async () => {
            //     await DataSensor.addDataSensorTemp(sensorTemp).catch(err => handleError(err));
            //     await DataSensor.addDataSensorHum(sensorHumed).catch(err => handleError(err));
            // }, 60000);

            resolve();
        })
    },

    dataMonitoreo: Incubacion => {
        return new Promise(async (resolve, reject) => {
            // let message = {
            //     mensaje: "No hay Incubaciones Activas!"
            // }
            const incubacion = await Incubacion.findIncubacionByIncubadoraName().catch(err => handleError(err));

            try {
                let fecha_actual = new Date(dateFormatYMD()).getTime();

                for (const i in incubacion) {
                    let fecha_salida = new Date(incubacion[i].fecha_salida).getTime();
                    let hora_restante = (fecha_salida - fecha_actual) / (1000 * 60 * 60 * 24);

                    incubacion[i].dia_incubacion = hora_restante;
                    incubacion[i].fecha_ingreso = dateFormatDMY(incubacion[i].fecha_ingreso);
                    incubacion[i].fecha_salida = dateFormatDMY(incubacion[i].fecha_salida);
                }

                // if (incubacion.length < 1) {
                //     incubacion.push(message)
                //     resolve(incubacion);
                // } else {
                //     resolve(incubacion);
                // }
                resolve(incubacion);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro incubacion' + error);
            }
        })
    }
}