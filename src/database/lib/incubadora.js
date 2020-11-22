'use strict'

module.exports = IncubadoraModel => {

    async function addIncubadora(data) {
        return await IncubadoraModel.create(data);
    }

    async function findIncubadoraAll() {
        return await IncubadoraModel.findAll();
    }

    /* #Usado en el Componente: incubadora */
    async function findIncubadoraAllOn() {
        return await IncubadoraModel.findAll({
            attributes: ['id_incubadora', 'nombre_incubadora'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                estado: "Activo"
            },
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }

    async function findIncubadoraById(id_incubadora) {
        const result = await IncubadoraModel.findOne({
          where: {
            id_incubadora
          }
        })
        return result.toJSON();
      }
    
      async function updateIncubadoraById(id_incubadora, Incubadora) {
        const cond = {
          where: {
            id_incubadora
          }
        }
    
        return await IncubadoraModel.update(Incubadora, cond)
      }


    return {
        addIncubadora,
        findIncubadoraAll,
        findIncubadoraAllOn,
        findIncubadoraById,
        updateIncubadoraById

    }
}