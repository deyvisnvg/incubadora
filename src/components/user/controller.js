const nanoid = require('nanoid');
const helpers = require('../../lib/helpers');

const { handleError } = require('../../error');

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

    editUser: function (dni_persona, id_usuario, Usuario, Persona) {
        return new Promise(async (resolve, reject) => {
            if (!dni_persona && !id_usuario) {
                reject("Las id no se recibieron");
                return false;
            }

            try {
                const usuario = await Usuario.findUsuarioId(id_usuario);
                const persona = await Persona.findPersonaId(dni_persona);
                let data = {
                    usuario,
                    persona
                }
                // console.log(data)
                resolve(data);

            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateUser: function (ids, user, Usuario, Persona) {
        return new Promise(async (resolve, reject) => {

            const usuario = await Usuario.findUsuarioId(ids.id_usuario).catch(err => handleError(err));

            const dataPersona = {
                nombres: user.nombres,
                apellidos: user.apellidos,
                fecha_nacimiento: user.fecha_nacimiento,
                genero: user.genero,
                direccion: user.direccion,
                celular: user.celular,
                email: user.email
            }

            const dataUser = {
                usuario: user.usuario,
                modulo: user.modulo,
            }

            if (usuario.password != user.password) {
                dataUser.password = await helpers.encryptPassword(user.password)
            }

            // console.log(dataPersona);
            // console.log(dataUser);

            try {
                await Persona.updatePersonaId(ids.dni_persona, dataPersona);
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
            const persona = await Persona.findPersonasAll().catch(err => handleError(err));

            for (let i in user) {
                let nameUser = user[i].usuario;

                if (nameUser == body.usuario) {
                    reject("El usuario ya existe, ingrese otra!");
                    return false;
                }

            }

            for (let i in persona) {
                let dniPersona = persona[i].dni_persona;

                if (dniPersona == body.dni) {
                    reject("La persona ya esta registrada, ingrese otra!");
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
                dni_persona: body.dni,
                nombres: body.nombre,
                apellidos: body.apellido,
                fecha_nacimiento: body.fecha_nacimiento,
                genero: body.genero,
                direccion: body.direccion,
                celular: body.celular,
                email: body.email
            }

            userRetorno = await Usuario.addUser(newUser).catch(handleError);

            if (userRetorno) {
                await Persona.addUserPersona(newPersona).catch(handleError);
                resolve();
            }
        })
    },

    //========================== Representante ==========================//

    listEmpresa: Empresa => {
        return new Promise(async (resolve, reject) => {

            const dataEmpresa = await Empresa.findEmpresaAll().catch(handleError);
            resolve(dataEmpresa);
        })
    },

    listRepresentante: Representante => {
        return new Promise(async (resolve, reject) => {
            const dataRepre = await Representante.findRepresentanteAll().catch(handleError);
            // console.log(dataRepre)
            resolve(dataRepre);
        })
    },

    editRepresentante: function (ids, RepresentanteEmpresa, Representante, Empresa) {
        return new Promise(async (resolve, reject) => {
            let data = {};

            if (!ids.dni_persona) {
                reject("La id no se recibió");
                return false;
            }

            try {
                const representante = await Representante.findRepresentanteById(ids.id_representante).catch(handleError);
                const empresa_asociada = await RepresentanteEmpresa.findRepresentanteEmpresaById(ids.id_representante).catch(handleError);
                const empresa = await Empresa.findEmpresaAll().catch(handleError);

                empresa_asociada.map(m => {
                    for (let i in empresa) {
                        if (m.id_empresa == empresa[i].ruc_empresa) {
                            delete empresa[i];
                            // empresa.mensaje = "No hay data"
                        }
                    }
                })

                data.representante = representante;
                data.empresa_asociada = empresa_asociada;
                data.empresa = empresa;

                console.log(data);
                resolve(data);

            } catch (err) {
                reject('[Error!]:', err);
            }
        })
    },

    updateRepresentante: function (id, data, Persona, Representante, RepresentanteEmpresa) {
        return new Promise(async (resolve, reject) => {
            console.log(data);
            let repEmpresa;

            let ids = id.split('&');
            let dataId = {
                dni_persona: ids[0],
                id_representante: ids[1]
            }

            const dataPersona = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                fecha_nacimiento: data.fecha_nacimiento,
                genero: data.genero,
                direccion: data.direccion,
                celular: data.celular,
                email: data.email
            }

            if (typeof data.representante_empresa !== 'undefined') {
                if (Array.isArray(data.representante_empresa)) {
                    for (const iterador of data.representante_empresa) {
                        let m = iterador.split('&');
                        repEmpresa = {
                            id_representante_empresa: m[0],
                            estado: m[1]
                        }
                        if (repEmpresa.estado == 'Activo') {
                            await RepresentanteEmpresa.updateRepresentanteEmpresaById(repEmpresa.id_representante_empresa, { estado: 'Inactivo' }).catch(handleError);
                        } else {
                            await RepresentanteEmpresa.updateRepresentanteEmpresaById(repEmpresa.id_representante_empresa, { estado: 'Activo' }).catch(handleError);
                        }
                    }
                } else {
                    let m = data.representante_empresa.split('&');
                    repEmpresa = {
                        id_representante_empresa: m[0],
                        estado: m[1]
                    }
                    if (repEmpresa.estado == 'Activo') {
                        await RepresentanteEmpresa.updateRepresentanteEmpresaById(repEmpresa.id_representante_empresa, { estado: 'Inactivo' }).catch(handleError);
                    } else {
                        await RepresentanteEmpresa.updateRepresentanteEmpresaById(repEmpresa.id_representante_empresa, { estado: 'Activo' }).catch(handleError);
                    }
                }
            }

            try {
                result = await Persona.updatePersonaId(dataId.dni_persona, dataPersona);
                if (result) {
                    let dataRepresentante = {
                        estado: data.estado
                    }
                    await Representante.updateRepresentanteById(dataId.id_representante, dataRepresentante);
                }
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

    addRepresentante: (body, Usuario, Representante, Persona, RepresentanteEmpresa) => {
        return new Promise(async (resolve, reject) => {
            let id_usuario;
            let empresa_asociada = {};
            let empresas_asociadas = [];

            const user = await Usuario.findUsuarioAll().catch(handleError);
            const persona = await Persona.findPersonasAll().catch(handleError);

            for (let i in user) {
                let nameUser = user[i].usuario;

                if (nameUser == body.dni_persona) {
                    reject("El usuario ya existe, ingrese otra!");
                    return false;
                }
            }

            for (let i in persona) {
                let dniPersona = persona[i].dni_persona;

                if (dniPersona == body.dni_persona) {
                    reject("La persona ya esta registrada, ingrese otra!");
                    return false;
                }
            }

            if (!body.id_usuario) {
                id_usuario = nanoid();
                body.id_usuario = id_usuario;
            }

            if (Array.isArray(body.empresas)) {
                for (const idEmpresa of body.empresas) {
                    data = {
                        id_representante: body.id_representante,
                        id_empresa: idEmpresa,
                        estado: 'Activo'
                    }
                    empresas_asociadas.push(data);
                }
            } else {
                empresa_asociada.id_representante = body.id_representante;
                empresa_asociada.id_empresa = body.empresas;
                empresa_asociada.estado = 'Activo';
            }

            const newUser = {
                id_usuario,
                usuario: body.dni_persona,
                modulo: body.modulo,
                password: await helpers.encryptPassword(body.dni_persona),
            }

            try {
                await Usuario.addUser(newUser)
                await Representante.addUserRepresentante(body)

                if (Object.keys(empresa_asociada).length > 0) {
                    await RepresentanteEmpresa.addRepresentanteEmpresa(empresa_asociada)
                } else {
                    await RepresentanteEmpresa.addRepresentanteEmpresaMasivo(empresas_asociadas)
                }
                resolve();

            } catch (error) {
                reject("Error inesperado!");
            }
        })
    }
}