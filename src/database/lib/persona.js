'use strict'

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = (PersonaModel, UsuarioModel, RepresentanteModel, EmpresaModel) => {

  async function addUserPersona(data) {

    const newPersona = {
      id_persona: data.id_persona,
      dni_persona: data.dni_persona,
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: "2020-01-01",
      genero: "Actualizar",
      direccion: "Actualizar",
      celular: "111111111",
      email: "Actualizar@gmail.com",
      id_usuario: data.id_usuario
    }

    return await PersonaModel.create(newPersona);

  }

  async function findPersonaAll() {
    const persona = await PersonaModel.findAll({
      include: [{ // Con include hacemos los join o la relación con la tabla
        attributes: ['modulo'],
        model: UsuarioModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        where: {
          modulo: {
            [Op.notIn]: ['Representante_Legal']
          }
        }
      }],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    });

    for (let i in persona) {
      if (persona[i]['usuario.modulo'] == 'SuperAdministrador') {
        persona[i]['usuario.modulo'] = 'Super Administrador'
      }
    }

    return persona;
  }

  async function findByPersonaId(id_persona) {
    const persona = await PersonaModel.findAll({
      attributes: ['id_persona', 'dni_persona', 'nombres', 'apellidos'],
      where: {
        id_persona
      },
      include: [
        { // Con include hacemos los join o la relación con la tabla
          attributes: ['id_usuario', 'modulo'],
          model: UsuarioModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        },
        {
          attributes: ['id_representante', 'cargo'],
          model: RepresentanteModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
          include: [{
            attributes: ['nombre_empresa'],
            model: EmpresaModel
          }]
        }
      ],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    });

    // for (let i in persona) {
    //   if (persona[i]['usuario.modulo'] == 'SuperAdministrador') {
    //     persona[i]['usuario.modulo'] = 'Super Administrador'
    //   }
    // }

    return persona;
  }

  // async function findByPersonaModulo() {
  //   return PersonaModel.findAll({
  //     // attributes: ['id_persona', 'nombres', 'apellidos', 'edad', 'fecha_nacimiento', 'id_usuario', ''], // Para seleccionar ese atributo específico que quiero retornar
  //     // group: ['type'], // Lo agrupamos por type
  //     include: [{ // Con include hacemos los join o la relación con la tabla
  //       attributes: [],
  //       model: UsuarioModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
  //       where: { // Especificamos la uuid
  //         modulo: {
  //           [Op.notIn]: ['SuperAdministrador']
  //         }
  //       }
  //     }],
  //     raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
  //   })
  // }

  // async function findPersonaIdUser(id_usuario) {
  //   const result = await PersonaModel.findOne({
  //     attributes: ['id_persona', 'nombres', 'apellidos', 'edad', 'email', 'fecha_nacimiento', 'foto'],
  //     where: {
  //       id_usuario
  //     }
  //   })
  //   return result.toJSON();
  // }

  // async function findPersonaId(id_persona) {
  //   const result = await PersonaModel.findOne({
  //     where: {
  //       id_persona
  //     }
  //   })
  //   return result.toJSON();
  // }

  // async function updatePersonaId(id_persona, persona) {
  //   const cond = {
  //     where: {
  //       id_persona
  //     }
  //   }

  //   return await PersonaModel.update(persona, cond)
  // }

  return {
    addUserPersona,
    findPersonaAll,
    findByPersonaId
    // findByPersonaModulo,
    // findPersonaIdUser,
    // findPersonaId,
    // updatePersonaId
  }
}