'use strict'

const { Op, literal } = require('sequelize');

module.exports = EmpresaModel => {

  async function addEmpresa(data) {
    return await EmpresaModel.create(data);
  }

  /* INICIO: Componentes: empresa, user */
  async function findEmpresaAll() {
    return await EmpresaModel.findAll({
      attributes: ['ruc_empresa', 'nombre_empresa', 'email', 'celular', 'telefono'],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    });
  }

  async function findEmpresaId(ruc_empresa) {
    const result = await EmpresaModel.findOne({
      where: {
        ruc_empresa
      }
    })

    return result.toJSON();
  }

  async function updateEmpresaId(ruc_empresa, empresa) {
    const cond = {
      where: {
        ruc_empresa
      }
    }

    return await EmpresaModel.update(empresa, cond)
  }
  /* FIN */

  /* INICIO: Componentes: user */
  async function findEmpresaAllNotIn() {
    const result = await EmpresaModel.findAll({
      where: {
        ruc_empresa: {
          [Op.notIn]: literal('(SELECT id_empresa FROM representante_empresa)')
        }
      },
      raw: true
    })

    return result;
  }
  /* FIN */

  return {
    addEmpresa,
    findEmpresaAll,
    findEmpresaId,
    updateEmpresaId,
    findEmpresaAllNotIn
  }
}