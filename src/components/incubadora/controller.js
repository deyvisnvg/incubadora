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

            try {
                await Incubadora.addIncubadora(incubadora).catch(err => handleError(err));
                resolve();
            } catch (error) {
                reject('Error! al Agregar, intentelo nuevamente');
            }

        })
    },

    editIncubadora: function (id_incubadora, Incubadora) {
        return new Promise(async (resolve, reject) => {

            if (!id_incubadora) {
                reject("La id no se recibió");
                return false;
            }

            try {
                const incubadora = await Incubadora.findIncubadoraById(id_incubadora);
                // console.log(empresa)
                resolve(incubadora);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateIncubadora: function (id_incubadora, body, Incubadora) {
        return new Promise(async (resolve, reject) => {
            const dataIncubadora = {
                nombre_incubadora: body.nombre_incubadora,
                estado: body.estado
            }

            try {
                await Incubadora.updateIncubadoraById(id_incubadora, dataIncubadora);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
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
                data.fecha_salida = dateFormatYMD_add(22);
                data.hora_ingreso = dateFormatHms();

                data.dataIncubadora = incubadora;
                data.dataPedido = pedido;

                // console.log(data);
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

            try {
                await Incubacion.addIncubacion(newIncubacion).catch(err => handleError(err));
                resolve();
            } catch (error) {
                reject('Error! al Agregar, intentelo nuevamente');
            }

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
            const pedido = await Pedido.findPedidoByIdAll(id_pedido).catch(err => handleError(err));

            try {
                data.dataIncubacion = incubacion;
                data.dataPedido = pedido;

                // console.log("Holaaa", data);
                resolve(data);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro');
            }

        })
    },

    editIncubacion: function (id_incubacion, Incubacion, Incubadora, Pedido) {
        return new Promise(async (resolve, reject) => {
            let data = {};

            if (!Pedido) {
                reject("La id no se recibió");
                return false;
            }

            try {
                const incubadora = await Incubadora.findIncubadoraAllOn();
                const incubacion = await Incubacion.findIncubacionById(id_incubacion);

                data.dataIncubadora = incubadora;
                data.incubacion = incubacion;
                // console.log(pedido)
                resolve(data);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateIncubacion: function (id_incubacion, body, Incubacion) {
        return new Promise(async (resolve, reject) => {
            const dataIncubacion = {
                // id_incubacion: body.identificador,
                fecha_ingreso: body.fecha_ingreso,
                fecha_salida: body.fecha_salida,
                hora_ingreso: body.hora_ingreso,
                estado: body.estado,
                piso_inicio: body.piso_inicio,
                piso_fin: body.piso_fin,
                cantidad_ingreso: body.cantidad_ingreso,
                // id_pedido: body.id_pedido,
                id_incubadora: body.incubadora
            }

            console.log(id_incubacion);
            console.log(dataIncubacion);

            try {
                await Incubacion.updateIncubacionById(id_incubacion, dataIncubacion);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

    //------------------------------ incidencia ------------------------------//
    listIncidencia: (id, Incidencia) => {
        return new Promise(async (resolve, reject) => {
            let data = {};
            let dataId = id.split("&");

            let ids = {
                id_incubacion: dataId[0],
                id_pedido: dataId[1]
            }

            try {
                const incidencia = await Incidencia.findIncidenciaByIncubacionId(ids.id_incubacion).catch(err => handleError(err));

                for (const i in incidencia) {
                    incidencia[i].id_pedido = ids.id_pedido;
                }

                data.dataIncidencia = incidencia;
                data.ids = ids;

                console.log(incidencia);

                resolve(data);
            } catch (error) {
                reject("Error! al listar, Inténtelo nuevamente.");
            }
        })
    },

    addIncidencia: (body, Incidencia) => {
        return new Promise(async (resolve, reject) => {
            const dataIncidencia = {
                id_incidencias: body.identificador,
                descripcion: body.detalle_incidencia,
                cantidad_nacidos: body.cantidad_nacidos,
                cantidad_defectuosos: body.cantidad_defectuosos,
                fecha_registrada: dateFormatYMD(),
                id_incubacion: body.id_incubacion
            }

            try {
                await Incidencia.addIncidencia(dataIncidencia).catch(err => handleError(err));
                resolve();
            } catch (error) {
                reject("Error! al Agregar, Inténtelo nuevamente.");
            }

        })
    },

    editIncidencia: (id, Incidencia) => {
        return new Promise(async (resolve, reject) => {
            let data = {};

            let dataId = id.split("&");

            let ids = {
                id_incidencias: dataId[0],
                id_incubacion: dataId[1],
                id_pedido: dataId[2]
            }

            try {
                const incidencia = await Incidencia.findIncidenciaById(ids.id_incidencias).catch(err => handleError(err));

                data.dataIncidencia = incidencia;
                data.ids = ids;

                console.log(data);
                resolve(data);

            } catch (error) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

    updateIncidencia: (body, Incidencia) => {
        return new Promise(async (resolve, reject) => {

            const dataIncidencia = {
                descripcion: body.detalle_incidencia,
                cantidad_nacidos: body.cantidad_nacidos,
                cantidad_defectuosos: body.cantidad_defectuosos
            }

            try {
                await Incidencia.updateIncidencia(body.identificador, dataIncidencia).catch(err => handleError(err));
                resolve();
            } catch (error) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }

        })
    },

}