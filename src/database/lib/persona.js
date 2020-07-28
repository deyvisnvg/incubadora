'use strict'

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = (PersonaModel, UsuarioModel) => {

  async function findPersonaAll() {
    const persona = await PersonaModel.findAll({
      include: [{ // Con include hacemos los join o la relación con la tabla
        attributes: ['modulo'],
        model: UsuarioModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
      }],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    });

    // let data = [];

    for (let i in persona) {

      // let variable = {
      //   dni_persona: persona[i].dni_persona,
      //   nombres: persona[i].nombres,
      //   apellidos: persona[i].apellidos,
      //   fecha_nacimiento: persona[i].fecha_nacimiento,
      //   genero: persona[i].genero,
      //   direccion: persona[i].direccion,
      //   celular: persona[i].celular,
      //   email: persona[i].email,
      //   id_usuario: persona[i].id_usuario
      // }

      if (persona[i]['usuario.modulo'] == 'SuperAdministrador') {
        persona[i]['usuario.modulo'] = 'Super Administrador'
      }
      // data.push(variable);
    }

    return persona;
  }

  async function findByPersonaModulo() {
    return PersonaModel.findAll({
      // attributes: ['id_persona', 'nombres', 'apellidos', 'edad', 'fecha_nacimiento', 'id_usuario', ''], // Para seleccionar ese atributo específico que quiero retornar
      // group: ['type'], // Lo agrupamos por type
      include: [{ // Con include hacemos los join o la relación con la tabla
        attributes: [],
        model: UsuarioModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        where: { // Especificamos la uuid
          modulo: {
            [Op.notIn]: ['SuperAdministrador']
          }
        }
      }],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    })
  }

  async function findPersonaIdUser(id_usuario) {
    const result = await PersonaModel.findOne({
      attributes: ['id_persona', 'nombres', 'apellidos', 'edad', 'email', 'fecha_nacimiento', 'foto'],
      where: {
        id_usuario
      }
    })
    return result.toJSON();
  }

  async function findPersonaId(id_persona) {
    const result = await PersonaModel.findOne({
      where: {
        id_persona
      }
    })
    return result.toJSON();
  }

  async function updatePersonaId(id_persona, persona) {
    const cond = {
      where: {
        id_persona
      }
    }

    return await PersonaModel.update(persona, cond)
  }

  return {
    findPersonaAll,
    findByPersonaModulo,
    findPersonaIdUser,
    findPersonaId,
    updatePersonaId
  }
}