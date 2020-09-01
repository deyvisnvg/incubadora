'use strict'

module.exports = (RepresentanteModel, PersonaModel, EmpresaModel, UsuarioModel) => {

  async function addUserRepresentante(data) {

    const newPersona = {
      id_persona: data.id_persona,
      dni_persona: data.dni_persona,
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: data.fecha_nacimiento,
      genero: data.genero,
      direccion: data.direccion,
      celular: data.celular,
      email: data.email,
      id_usuario: data.id_usuario
    }

    const newRepresentante = {
      cargo: data.cargo,
      id_persona: data.id_persona,
      id_empresa: data.id_empresa
    }

    let persona = await PersonaModel.create(newPersona);

    if (persona) {
      return await RepresentanteModel.create(newRepresentante);
    }
  }

  async function findRepresentanteAll() {
    return UsuarioModel.findAll({
      attributes: ['id_usuario'], // Para seleccionar ese atributo específico que quiero retornar
      where: {
        modulo: "Representante_Legal"
      },
      // as: "PersonaModel",
      // group: ['type'], // Lo agrupamos por type
      include: [{ // Con include hacemos los join o la relación con la tabla
        attributes: ['dni_persona', 'nombres', 'apellidos', 'celular'],
        model: PersonaModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        include: [{
          attributes: ['id_representante', 'cargo'],
          model: RepresentanteModel,
          include: [{
            attributes: ['nombre_empresa'],
            model: EmpresaModel
          }]
        }]
      }],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    })
  }

  async function findByRepresentante() {
    return UsuarioModel.findAll({
      attributes: ['id_usuario'], // Para seleccionar ese atributo específico que quiero retornar
      where: {
        modulo: "Representante_Legal"
      },
      // as: "PersonaModel",
      // group: ['type'], // Lo agrupamos por type
      include: [{ // Con include hacemos los join o la relación con la tabla
        attributes: ['id_persona', 'dni_persona', 'nombres', 'apellidos'],
        model: PersonaModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        include: [{
          attributes: ['id_representante', 'cargo'],
          model: RepresentanteModel,
        }]
      }],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    })
  }

  return {
    addUserRepresentante,
    findRepresentanteAll,
    findByRepresentante
  }
}