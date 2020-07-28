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

  async function createUser(data) {

    const user = await UsuarioModel.create(data);

    if (user) {
      let persona = {
        nombres: data.usuario,
        apellidos: "Completar",
        edad: "0",
        email: "completar@gmail.com",
        fecha_nacimiento: new Date(),
        foto: "/photos/avatar.jpeg",
        id_usuario: data.id_usuario
      }
      return await PersonaModel.create(persona);
    }
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
    createUser,
    updateUsuarioId
  }
}