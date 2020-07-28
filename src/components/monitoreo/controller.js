const nanoid = require('nanoid');
const helpers = require('../../lib/helpers');

const { handleError } = require('../../error');
const { config } = require('../../config');

module.exports = {

    listProducto: function (Producto) {
        return new Promise(async (resolve, reject) => {
            const producto = await Producto.findProductoAll().catch(err => handleError(err));
            let data = [];

            for (let i in producto) {

                let datas = {
                    id_producto: producto[i].id_producto,
                    name: producto[i].name,
                    descripcion: producto[i].descripcion,
                    marca: producto[i].marca,
                    precio: producto[i].precio,
                    precio_envio: producto[i].precio_envio,
                    foto: producto[i].foto,
                    foto_alternativa: producto[i].foto_alternativa,
                    fecha: producto[i].fecha
                }

                data.push(datas);
            }
            resolve(data);
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

    addProducto: function (files, body, Producto) {
        return new Promise(async (resolve, reject) => {
            let ruteFoto, ruteFoto_alternativa;

            // console.log(files.length)
            
            if (files.length < 2) {
                ruteFoto = config.filesRouteImg + '/' + files[0].originalname;
                ruteFoto_alternativa = config.filesRouteImg + '/' + 'sin_imagen.jpg';
            } else {
                ruteFoto = config.filesRouteImg + '/' + files[0].originalname;
                ruteFoto_alternativa = config.filesRouteImg + '/' + files[1].originalname;
            }
            
            const newProducto = {
                name: body.name,
                descripcion: body.descripcion,
                marca: body.marca,
                precio: body.precio,
                precio_envio: body.precio_envio,
                foto: ruteFoto,
                foto_alternativa: ruteFoto_alternativa,
                codigo: body.codigo,
                fecha: new Date()
            }
            
            console.log(newProducto)

            await Producto.addProducto(newProducto).catch(handleError);
            resolve();

        })
    }
}