'use strict'

module.exports = TipoSensorModel => {

    async function addtipoSensor(data) {
        return await TipoSensorModel.create(data);
    }

    async function findtipoSensorAll() {
        return await TipoSensorModel.findAll();
    }


    return {
        addtipoSensor,
        findtipoSensorAll
    }
}