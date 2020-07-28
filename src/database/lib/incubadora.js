'use strict'

module.exports = IncubadoraModel => {

    async function addIncubaadora(data) {
        return await IncubadoraModel.create(data);
    }

    async function findIncubadoraAll() {
        return await IncubadoraModel.findAll();
    }


    return {
        addIncubaadora,
        findIncubadoraAll
    }
}