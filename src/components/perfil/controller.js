const helpers = require('../../lib/helpers');
const { handleError } = require('../../error');

module.exports = {
    showPerfil: (user, Persona) => {
        return new Promise(async (resolve, reject) => {
            let persona, representante;

            if (user.modulo == 'Representante_Legal') {
                persona = await Persona.findPersonaByUserId(user.id_usuario).catch(handleError);
                persona.cargo = persona['representante.cargo'];
                resolve(persona);
            } else {
                representante = await Persona.findPersonaByUserId(user.id_usuario).catch(handleError);
                representante.cargo = representante['representante.cargo'];
                resolve(representante);
            }
        })
    },

    updatePerfil: (dni_persona, data, Persona, Representante) => {
        return new Promise(async (resolve, reject) => {
            let result;

            const dataPersona = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                fecha_nacimiento: data.fecha_nacimiento,
                genero: data.genero,
                direccion: data.direccion,
                celular: data.celular,
                email: data.email
            }

            try {
                if (typeof data.cargo === 'undefined') {
                    await Persona.updatePersonaId(dni_persona, dataPersona);
                } else {
                    result = await Persona.updatePersonaId(dni_persona, dataPersona);
                    if (result) {
                        await Representante.updateRepresentanteById(data.id_representante, { cargo: data.cargo });
                    }
                }
                resolve();
            } catch (error) {
                reject("[Error]: No es posible Modificar!" + error)
            }
        })
    },

    showConfigurationUser: (user, Usuario) => {
        return new Promise(async (resolve, reject) => {
            let usuario;

            try {
                usuario = await Usuario.findUsuarioId(user.id_usuario).catch(handleError);
                resolve(usuario);
            } catch (error) {
                reject("[Error]!" + error)
            }
        })
    },

    updateConfiguration: (id_usuario, data, Usuario) => {
        return new Promise(async (resolve, reject) => {

            const usuario = await Usuario.findUsuarioId(id_usuario).catch(err => handleError(err));

            const dataUser = {
                usuario: data.usuario,
                modulo: data.modulo,
            }

            if (usuario.password != data.password) {
                dataUser.password = await helpers.encryptPassword(data.password)
            }

            try {
                await Usuario.updateUsuarioId(id_usuario, dataUser);
                resolve();
            } catch (err) {
                reject("[Error]: No es posible Modificar!" + err)
            }
        })
    },

}