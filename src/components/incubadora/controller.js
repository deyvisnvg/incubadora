const nanoid = require('nanoid');

const { handleError } = require('../../error');
const { dateFormatYMD, dateFormatHms, dateFormatYMD_add } = require('../../dateFormatUtc');

module.exports = {

    listIncubadora: function (Incubadora) {
        return new Promise(async (resolve, reject) => {
            const incubadora = await Incubadora.findIncubadoraAll().catch(err => handleError(err));

            let data = incubadora.map(m => {
                let dataIncubadora = {
                    id_incubadora: m.id_incubadora,
                    nombre_incubadora: m.nombre_incubadora,
                    estado: m.estado
                }
                return dataIncubadora
            })

            resolve(data);
        })
    },

    addIncubadora: (body, Incubadora) => {
        return new Promise(async (resolve, reject) => {
            const incubadora = {
                nombre_incubadora: body.nombre_incubadora,
                estado: body.estado,
            }

            await Incubadora.addIncubadora(incubadora).catch(err => handleError(err));
            resolve();

        })
    },

    //------------------------------ incubacion ------------------------------//
    dataEnvioIncubacion: (Incubadora, Pedido) => {
        return new Promise(async (resolve, reject) => {

            let data = {};
            const incubadora = await Incubadora.findIncubadoraAllOn().catch(err => handleError(err));
            const pedido = await Pedido.findPedidoAllOn().catch(err => handleError(err));

            try {
                data.fecha_ingreso = dateFormatYMD();
                data.fecha_salida = dateFormatYMD_add();
                data.hora_ingreso = dateFormatHms();

                data.dataIncubadora = incubadora;
                data.dataPedido = pedido;

                console.log(data);
                resolve(data);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro incubacion');
            }

        })
    },

    addIncubacion: (body, Incubacion) => {
        return new Promise(async (resolve, reject) => {

            const newIncubacion = {
                id_incubacion: body.identificador,
                fecha_ingreso: body.fecha_ingreso,
                fecha_salida: body.fecha_salida,
                hora_ingreso: body.hora_ingreso,
                estado: body.estado,
                piso_inicio: body.piso_inicio,
                piso_fin: body.piso_fin,
                cantidad_ingreso: body.cantidad_ingreso,
                id_pedido: body.id_pedido,
                id_incubadora: body.incubadora
            }

            console.log(newIncubacion);

            await Incubacion.addIncubacion(newIncubacion).catch(err => handleError(err));
            resolve();

        })
    },

    listIncubacion: Incubacion => {
        return new Promise(async (resolve, reject) => {
            let data = {};
            const incubacion = await Incubacion.findIncubacionAll().catch(err => handleError(err));

            try {
                data.dataIncubacion = incubacion;

                console.log(data);
                resolve(data);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro incubacion');
            }
        })
    },

    viewIncubacion: (id_pedido, Incubacion, Pedido) => {
        return new Promise(async (resolve, reject) => {
            let data = {};
            const incubacion = await Incubacion.findIncubacionByPedidoId(id_pedido).catch(err => handleError(err));
            const pedido = await Pedido.findByPedidoId(id_pedido).catch(err => handleError(err));

            try {
                data.dataIncubacion = incubacion;
                data.dataPedido = pedido;

                console.log(data);
                resolve(data);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro');
            }

        })
    }
}