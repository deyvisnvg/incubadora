'use strict'

module.exports = (RepresentanteModel, PersonaModel, EmpresaModel, UsuarioModel) => {

  async function addUserRepresentante(data) {

    const newPersona = {
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
      id_representante: data.id_representante,
      cargo: data.cargo,
      estado: 'Activo',
      id_persona: data.dni_persona
    }

    let persona = await PersonaModel.create(newPersona);

    if (persona) {
      return await RepresentanteModel.create(newRepresentante);
    }
  }

  /* #Usado en el Componente: pedido, user */
  async function findRepresentanteById(id_representante) {
    const result = await RepresentanteModel.findOne({
      where: {
        id_representante
      },
      include: [{ model: PersonaModel }]
    })
    return result.toJSON();
  }

  async function findRepresentanteAll() {
    return RepresentanteModel.findAll({
      attributes: ['id_representante', 'cargo', 'estado'],
      include: [
        { // Con include hacemos los join o la relación con la tabla
          attributes: ['dni_persona', 'nombres', 'apellidos', 'celular'],
          model: PersonaModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
          include: [{
            attributes: ['id_usuario'],
            model: UsuarioModel,
            where: {
              modulo: "Representante_Legal"
            }
          }]
        }
      ],
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
        attributes: ['dni_persona', 'nombres', 'apellidos'],
        model: PersonaModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
        include: [{
          attributes: ['id_representante', 'cargo'],
          model: RepresentanteModel,
        }]
      }],
      raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    })
  }

  async function updateRepresentanteById(id_representante, representante) {
    const cond = {
      where: {
        id_representante
      }
    }

    return await RepresentanteModel.update(representante, cond)
  }
  

  return {
    addUserRepresentante,
    findRepresentanteById,
    findRepresentanteAll,
    findByRepresentante,
    updateRepresentanteById
  }
}