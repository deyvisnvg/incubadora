'use strict'

module.exports = IncubadoraModel => {

    async function addIncubadora(data) {
        return await IncubadoraModel.create(data);
    }

    async function findIncubadoraAll() {
        return await IncubadoraModel.findAll();
    }

    async function findIncubadoraAllOn() {
        return await IncubadoraModel.findAll({
            attributes: ['id_incubadora', 'nombre_incubadora'], // Para seleccionar ese atributo específico que quiero retornar
            // group: ['type'], // Lo agrupamos por type
            where: {
                estado: "Activo"
            },
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }


    return {
        addIncubadora,
        findIncubadoraAll,
        findIncubadoraAllOn
    }
}