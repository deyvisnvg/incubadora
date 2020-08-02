const { socket } = require('../../socket');
const { handleError } = require('../../error');

module.exports = {

    recivedDataSensor: (data, Sensor) => {
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
            }

            for (const i in sensorHumed) {
                sensorHumed[i].valor = humedad[i]
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

            resolve();
        })
    },
}