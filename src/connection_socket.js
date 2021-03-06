// // Lo que vamos a utilizar en ambos extremos cuando se comunica el servidor con el navegador, es empezar a escuchar eventos.
var db = require('./database');
const { configDb } = require('./config')
const { handleFatalError } = require('./error');

let result;

module.exports = async (io) => {

    const services = await db(configDb).catch(err => handleFatalError(err));
    let RepresentanteEmpresa = services.RepresentanteEmpresa;
    let Pedido = services.Pedido;

    io.on("connection", socket => {
        // console.log("New user connected!", socket.id);
        socket.on("op:empresa_asociar", async data => {
            try {
                let state = false;
                result = await RepresentanteEmpresa.addRepresentanteEmpresa(data);

                if (result) {
                    state = true;
                    io.sockets.emit("op:empresa_asociar", state);
                }

            } catch (err) {
                return handleFatalError(err);
            }
        })

        socket.on("op:representante", async id_representante => {
            try {
                console.log(id_representante);
                result = await RepresentanteEmpresa.findRepresentanteEmpresaById(id_representante);
                if (result) {
                    io.sockets.emit("data:empresa", result);
                }

            } catch (err) {
                return handleFatalError(err);
            }
        })

        socket.on("op:buscar_pedido", async id_representante_empresa => {
            try {
                result = await Pedido.findPedidoByPersonaIdAll(id_representante_empresa);
                if (result) {
                    io.sockets.emit("data:buscar_pedido", result);
                }
            } catch (err) {
                return handleFatalError(err);
            }

        })

    })
}
