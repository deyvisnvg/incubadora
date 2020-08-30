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

  function findUsuarioId(id_usuario) {
    return UsuarioModel.findOne({
      where: {
        id_usuario
      }
    })
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