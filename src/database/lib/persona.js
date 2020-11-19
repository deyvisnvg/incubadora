'use strict'

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = (PersonaModel, UsuarioModel, RepresentanteModel, EmpresaModel, RepresentanteEmpresaModel) => {

  async function addUserPersona(data) {

    const newPersona = {
      dni_persona: data.dni_persona,
      id_persona: data.id_persona,
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: data.fecha_nacimiento,
      genero: data.genero,
      direccion: data.direccion,
      celular: data.celular,
      email: data.email,
      id_usuario: data.id_usuario
    }

    return await PersonaModel.create(newPersona);

  }

  async function findPersonasAll() {
    return await PersonaModel.findAll({
      raw: true
    });
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

  async function findByPersonaId(dni_persona) {
    const persona = await PersonaModel.findAll({
      attributes: ['dni_persona', 'nombres', 'apellidos'],
      where: {
        dni_persona
      },
      include: [
        {
          attributes: ['id_usuario', 'modulo'],
          model: UsuarioModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        },
        {
          attributes: ['id_representante', 'cargo'],
          model: RepresentanteModel // La tabla o modelo con quien voya a relacionarlo o hacer el join
        }
      ],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    });

    return persona;
  }

  async function findRepresentanteEmpresaMonitoreo(id_usuario) {
    const result = await PersonaModel.findAll({
      attributes: ['dni_persona', 'id_usuario'],
      where: {
        id_usuario
      },
      include: [{
        attributes: ['id_representante'],
        model: RepresentanteModel,
        include: [{
          attributes: ['id_representante_empresa'],
          model: RepresentanteEmpresaModel,
          include: [{
            attributes: ['ruc_empresa', 'nombre_empresa'],
            model: EmpresaModel
          }]
        }]
      }],
      raw: true
    })
    return result;
  }

  async function findPersonaByUserId(id_usuario) {
    return PersonaModel.findOne({
      where: {
        id_usuario
      },
      include: [{
        attributes: ['id_representante', 'cargo'],
        model: RepresentanteModel,
      }],
      raw: true
    })
  }

  async function findPersonaId(dni_persona) {
    const result = await PersonaModel.findOne({
      where: {
        dni_persona
      }
    })
    return result.toJSON();
  }

  async function updatePersonaId(dni_persona, persona) {
    const cond = {
      where: {
        dni_persona
      }
    }

    return await PersonaModel.update(persona, cond)
  }

  return {
    addUserPersona,
    findPersonaAll,
    findPersonasAll,
    findByPersonaId,
    findPersonaId,
    updatePersonaId,
    findRepresentanteEmpresaMonitoreo,
    findPersonaByUserId
  }
}