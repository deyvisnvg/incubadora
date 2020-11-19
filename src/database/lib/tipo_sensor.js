'use strict'

module.exports = TipoSensorModel => {

    async function addtipoSensor(data) {
        return await TipoSensorModel.create(data);
    }

    async function findtipoSensorAll() {
        return await TipoSensorModel.findAll();
    }

    async function findTipoSensorById(id_tipoSensor) {
        const result = await TipoSensorModel.findOne({
          where: {
            id_tipoSensor
          }
        })
        return result.toJSON();
      }
    
      async function updateTipoSensorById(id_tipoSensor, TipoSensor) {
        const cond = {
          where: {
            id_tipoSensor
          }
        }
    
        return await TipoSensorModel.update(TipoSensor, cond)
      }



    return {
        addtipoSensor,
        findtipoSensorAll,
        findTipoSensorById,
        updateTipoSensorById
    }
}