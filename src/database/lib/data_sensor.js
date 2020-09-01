'use strict'

module.exports = DataSensorModel => {

    async function addDataSensorTemp(data) {
        return await DataSensorModel.bulkCreate(data);
    }

    async function addDataSensorHum(data) {
        return await DataSensorModel.bulkCreate(data);
    }


    return {
        addDataSensorTemp,
        addDataSensorHum
    }
}