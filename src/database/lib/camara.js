'use strict'

module.exports = (CamaraModel, IncubadoraModel) => {

    async function addCamara(data) {
        return await CamaraModel.create(data);
    }

    /* #Usado en el Componente: Camara */
    async function findCamaraAll() {
        return await CamaraModel.findAll({
            attributes: ['id_camara', 'ip_camara', 'estado'], // Para seleccionar ese atributo específico que quiero retornar
            include: [{
              attributes: ['id_incubadora', 'nombre_incubadora'],
              model: IncubadoraModel
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }

    async function findCamaraById(id_camara) {
        const result = await CamaraModel.findOne({
          where: {
            id_camara
          },
          include: [{
            attributes: ['nombre_incubadora'],
            model: IncubadoraModel
          }],
        })
        return result.toJSON();
      }
    
      async function updateCamaraById(id_camara, data) {
        const cond = {
          where: {
            id_camara
          }
        }
    
        return await CamaraModel.update(data, cond)
      }


    return {
        addCamara,
        findCamaraAll,
        findCamaraById,
        updateCamaraById
    }
}