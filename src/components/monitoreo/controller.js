const { socket } = require('../../socket');
const { handleError } = require('../../error');

module.exports = {

    dataMonitoreo: datos => {
        return new Promise(async (resolve, reject) => {
            //const producto = await Producto.findProductoAll().catch(err => handleError(err));

            socket.io.emit("sensores", datos)



            resolve();
        })
    },
}