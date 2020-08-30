const nanoid = require('nanoid');
const helpers = require('../../lib/helpers');

const { handleError } = require('../../error');
const { config } = require('../../config');

module.exports = {

    listUser: function (userModulo, Persona) {
        return new Promise(async (resolve, reject) => {

            let persona;

            try {
                if (userModulo === 'SuperAdministrador') {
                    persona = await Persona.findPersonaAll();
                } else if (userModulo === 'Administrador') {
                    persona = await Persona.findByPersonaModulo();
                }
                resolve(persona);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos del usuario');
            }
        })
    },

    editUser: function (id_persona, id_usuario, Usuario, Persona) {
        return new Promise(async (resolve, reject) => {
            if (!id_persona && !id_usuario) {
                reject("Las id no se recibieron");
                return false;
            }

            try {
                const user = await Usuario.findUsuarioId(id_usuario);
                const persona = await Persona.findPersonaId(id_persona);
                let data = {
                    usuario: user.toJSON(),
                    persona
                }
                resolve(data);

            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateUser: function (ids, user, file, Usuario, Persona) {
        return new Promise(async (resolve, reject) => {
            let nameFoto;

            if (typeof file !== 'undefined') {
                nameFoto = config.filesRoute + '/' + file.originalname;
            } else {
                nameFoto = user.foto;
            }

            console.log(user);

            const dataPersona = {
                nombres: user.nombres,
                apellidos: user.apellidos,
                edad: user.edad,
                email: user.email,
                fecha_nacimiento: user.fecha_nacimiento,
                foto: nameFoto
            }

            const dataUser = {
                usuario: user.usuario,
                modulo: user.modulo,
            }

            if (typeof user.password !== 'undefined' && user.password) {
                dataUser.password = await helpers.encryptPassword(user.password)
            }

            try {
                await Persona.updatePersonaId(ids.id_persona, dataPersona);
                await Usuario.updateUsuarioId(ids.id_usuario, dataUser);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

    registroUser: function (body, Usuario, Persona) {
        return new Promise(async (resolve, reject) => {
            let id_usuario, userRetorno;

            if (body.password !== body.password2) {
                reject("Las contraseñas no coinciden")
                return false
            }

            const user = await Usuario.findUsuarioAll().catch(err => handleError(err));

            for (let i in user) {
                let nameUser = user[i].usuario;

                if (nameUser == body.usuario) {
                    reject("El usuario ya existe, ingrese otra!");
                    return false;
                }

            }

            if (!body.id_usuario) {
                id_usuario = nanoid();
            }

            const newUser = {
                id_usuario,
                usuario: body.usuario,
                modulo: body.modulo,
                password: await helpers.encryptPassword(body.password),
            }

            const newPersona = {
                id_usuario,
                nombres: body.nombre,
                apellidos: body.apellido,
                dni_persona: body.dni,
            }

            if (!body.id_persona) {
                newPersona.id_persona = nanoid();
            }

            userRetorno = await Usuario.addUser(newUser).catch(handleError);

            if (userRetorno) {
                await Persona.addUserPersona(newPersona).catch(handleError);
                resolve();
            }
        })
    },

    listEmpresa: Empresa => {
        return new Promise(async (resolve, reject) => {

            const dataEmpresa = await Empresa.findEmpresaAll().catch(handleError);
            resolve(dataEmpresa);
        })
    },

    listRepresentante: Representante => {
        return new Promise(async (resolve, reject) => {
            const dataRepre = await Representante.findRepresentanteAll().catch(handleError);
            console.log(dataRepre)
            resolve(dataRepre);
        })
    },

    addRepresentante: (body, Usuario, Representante) => {
        return new Promise(async (resolve, reject) => {
            let id_persona, id_usuario, id_representante, userRetorno;

            if (body.password !== body.password2) {
                reject("Las contraseñas no coinciden")
                return false
            }

            const user = await Usuario.findUsuarioAll().catch(err => handleError(err));

            for (let i in user) {
                let nameUser = user[i].usuario;

                if (nameUser == body.usuario) {
                    reject("El usuario ya existe, ingrese otra!");
                    return false;
                }

            }

            if (!body.id_usuario) {
                id_usuario = nanoid();
            }

            const newUser = {
                id_usuario,
                usuario: body.usuario,
                modulo: body.modulo,
                password: await helpers.encryptPassword(body.password),
            }

            const newData = {
                id_usuario,
                nombres: body.nombre,
                apellidos: body.apellido,
                dni_persona: body.dni,
                cargo: body.cargo,
                id_empresa: body.id_empresa
            }

            if (!body.id_persona) {
                newData.id_persona = nanoid();
            }

            userRetorno = await Usuario.addUser(newUser).catch(handleError);

            if (userRetorno) {
                await Representante.addUserRepresentante(newData).catch(handleError);
                resolve();
            }
        })
    }
}