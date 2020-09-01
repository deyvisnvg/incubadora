const { handleError } = require('../../error');
const { config } = require('../../config');
const { dateFormatYMD, dateFormatHms } = require('../../dateFormatUtc');

module.exports = {

    dataEnvio: Representante => {
        return new Promise(async (resolve, reject) => {

            let data = {};
            const dataRepresentante = await Representante.findByRepresentante().catch(err => handleError(err));

            try {
                data.fecha_pedido = dateFormatYMD();
                data.hora_pedido = dateFormatHms();
                data.representante = dataRepresentante;

                // console.log(data);
                resolve(data);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro');
            }
        })
    },

    addPedido: (body, Pedido) => {
        return new Promise(async (resolve, reject) => {

            const newPedido = {
                id_pedido: body.identificador,
                cantidad: body.cantidad_pedido,
                comentario: body.comentario,
                fecha_pedido: body.fecha_pedido,
                hora_pedido: body.hora_pedido,
                fecha_entrega: body.fecha_entrega,
                estado: body.estado,
                id_persona: body.representante
            }

            // console.log(newPedido);

            await Pedido.addPedido(newPedido).catch(err => handleError(err));
            resolve();

        })
    },

    listPedido: Pedido => {
        return new Promise(async (resolve, reject) => {
            const dataPedido = await Pedido.findPedidoAll().catch(err => handleError(err));

            // console.log(dataPedido);
            resolve(dataPedido);
        })
    },

    viewPedido: (id_persona, Pedido, Persona) => {
        return new Promise(async (resolve, reject) => {
            let data = {};
            const persona = await Persona.findByPersonaId(id_persona).catch(err => handleError(err));
            const pedido = await Pedido.findPedidoByPersonaId(id_persona).catch(err => handleError(err));

            try {
                data.dataPersona = persona;
                data.dataPedido = pedido;

                // console.log(data);
                resolve(data);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro');
            }

        })
    }

    // editUser: function (id_persona, id_usuario, Usuario, Persona) {
    //     return new Promise(async (resolve, reject) => {
    //         if (!id_persona && !id_usuario) {
    //             reject("Las id no se recibieron");
    //             return false;
    //         }

    //         try {
    //             const user = await Usuario.findUsuarioId(id_usuario);
    //             const persona = await Persona.findPersonaId(id_persona);
    //             let data = {
    //                 usuario: user.toJSON(),
    //                 persona
    //             }
    //             resolve(data);

    //         } catch (err) {
    //             reject('[Error!]:', err);
    //         }

    //     })
    // },

    // updateUser: function (ids, user, file, Usuario, Persona) {
    //     return new Promise(async (resolve, reject) => {
    //         let nameFoto;

    //         if (typeof file !== 'undefined') {
    //             nameFoto = config.filesRoute + '/' + file.originalname;
    //         } else {
    //             nameFoto = user.foto;
    //         }

    //         console.log(user);

    //         const dataPersona = {
    //             nombres: user.nombres,
    //             apellidos: user.apellidos,
    //             edad: user.edad,
    //             email: user.email,
    //             fecha_nacimiento: user.fecha_nacimiento,
    //             foto: nameFoto
    //         }

    //         const dataUser = {
    //             usuario: user.usuario,
    //             modulo: user.modulo,
    //         }

    //         if (typeof user.password !== 'undefined' && user.password) {
    //             dataUser.password = await helpers.encryptPassword(user.password)
    //         }

    //         try {
    //             await Persona.updatePersonaId(ids.id_persona, dataPersona);
    //             await Usuario.updateUsuarioId(ids.id_usuario, dataUser);
    //             resolve();
    //         } catch (err) {
    //             reject("Error! al modificar, Inténtelo nuevamente.");
    //         }
    //     })
    // }
}