const helpers = require('../../lib/helpers');
const { handleError } = require('../../error');

module.exports = {
    showPerfil: (user, Persona) => {
        return new Promise(async (resolve, reject) => {
            let persona;

            persona = await Persona.findPersonaByUserId(user.id_usuario).catch(handleError);
            console.log(persona);
            resolve(persona);
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
                await Persona.updatePersonaId(dni_persona, dataPersona);
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