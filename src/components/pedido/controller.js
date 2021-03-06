const { handleError } = require('../../error');
const { config } = require('../../config');
const { dateFormatYMD, dateFormatHms, dateFormatYMD_add } = require('../../dateFormatUtc');

module.exports = {

    dataEnvio: Representante => {
        return new Promise(async (resolve, reject) => {

            let data = {};
            const dataRepresentante = await Representante.findByRepresentante().catch(handleError);

            try {
                data.fecha_pedido = dateFormatYMD();
                data.fecha_entrega = dateFormatYMD_add(25);
                data.hora_pedido = dateFormatHms();
                data.representante = dataRepresentante;

                // console.log(data);
                resolve(data);

            } catch (error) {
                reject('Error! No se pudo obtener los datos para el registro');
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
                id_representante_empresa: body.id_representante_empresa
            }

            await Pedido.addPedido(newPedido).catch(err => handleError(err));
            resolve();
        })
    },

    listPedido: Pedido => {
        return new Promise(async (resolve, reject) => {
            const dataPedido = await Pedido.findPedidoAll().catch(err => handleError(err));

            console.log(dataPedido);
            resolve(dataPedido);
        })
    },

    editPedido: (id, Pedido, Representante, Empresa) => {
        return new Promise(async (resolve, reject) => {
            let data = {};
            let ids = id.split("&");

            let dataId = {
                id_pedido: ids[0],
                id_representante: ids[1],
                id_empresa: ids[2]
            }

            try {
                const pedido = await Pedido.findPedidoById(dataId.id_pedido).catch(handleError);
                const representante = await Representante.findRepresentanteById(dataId.id_representante).catch(handleError);
                const empresa = await Empresa.findEmpresaId(dataId.id_empresa).catch(handleError);

                representante.ruc_empresa = empresa.ruc_empresa;
                representante.nombre_empresa = empresa.nombre_empresa;

                data.pedido = pedido;
                data.representante = representante;

                console.log(data);
                resolve(data);

            } catch (error) {
                reject('Error! No se pudo obtener los datos para el registro');
            }

        })
    },

    // editPedido: function (id_pedido, Pedido) {
    //     return new Promise(async (resolve, reject) => {

    //         if (!Pedido) {
    //             reject("La id no se recibió");
    //             return false;
    //         }

    //         try {
    //             const pedido = await Pedido.findPedidoById(id_pedido);
    //             // console.log(pedido)
    //             resolve(pedido);
    //         } catch (err) {
    //             reject('[Error!]:', err);
    //         }

    //     })
    // },

    updatePedido: function (id_pedido, body, Pedido) {
        return new Promise(async (resolve, reject) => {
            const dataPedido = {
                id_pedido: body.identificador,
                cantidad: body.cantidad_pedido,
                comentario: body.comentario,
                fecha_pedido: body.fecha_pedido,
                hora_pedido: body.hora_pedido,
                fecha_entrega: body.fecha_entrega,
                estado: body.estado
            }

            // console.log(dataPedido);

            try {
                await Pedido.updatePedidoById(id_pedido, dataPedido);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    }

}