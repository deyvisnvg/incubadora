'use strict'

module.exports = (RepresentanteEmpresaModel, EmpresaModel) => {

  async function addRepresentanteEmpresa(data) {
    return await RepresentanteEmpresaModel.create(data);
  }

  async function addRepresentanteEmpresaMasivo(data) {
    return await RepresentanteEmpresaModel.bulkCreate(data);
  }

  /* #Usado en el Componente: user */
  async function findRepresentanteEmpresaById(id_representante) {
    const result = await RepresentanteEmpresaModel.findAll({
      attributes: ['id_representante_empresa', 'id_representante', 'id_empresa', 'estado'],
      where: {
        id_representante
      },
      include: {
        attributes: ['ruc_empresa', 'nombre_empresa'],
        model: EmpresaModel
      },
      raw: true
    })
    return result;
    // NO ELIMINAR ESTO >> Consulta que obtiene todos los registros de ambas tablas y su tabla intermedia
    // const result = await RepresentanteModel.findAll({
    //   where: {
    //     id_representante
    //   },
    //   include: EmpresaModel,
    //   raw: true
    // });
    // console.log(result);
  }

  async function updateRepresentanteEmpresaById(id_representante_empresa, data) {
    const cond = {
      where: {
        id_representante_empresa
      }
    }

    return await RepresentanteEmpresaModel.update(data, cond)
  }


  return {
    addRepresentanteEmpresa,
    addRepresentanteEmpresaMasivo,
    findRepresentanteEmpresaById,
    updateRepresentanteEmpresaById
  }
}