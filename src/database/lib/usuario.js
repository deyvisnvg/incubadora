'use strict'

module.exports = (UsuarioModel, PersonaModel) => {

  function findUsuarioAll() {
    return UsuarioModel.findAll();
  }

  function findUsuario(usuario) {
    return UsuarioModel.findOne({
      where: {
        usuario
      }
    })
  }

  async function findUsuarioId(id_usuario) {
    const result = await UsuarioModel.findOne({
      where: {
        id_usuario
      }
    })
    return result.toJSON();
  }

  async function addUser(data) {
    return await UsuarioModel.create(data);
  }

  async function updateUsuarioId(id_usuario, usuario) {
    const cond = {
      where: {
        id_usuario
      }
    }

    return await UsuarioModel.update(usuario, cond)
  }

  return {
    findUsuarioAll,
    findUsuario,
    findUsuarioId,
    addUser,
    updateUsuarioId
  }
}