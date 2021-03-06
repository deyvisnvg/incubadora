const socketIO = require('socket.io');
const socket = {}; //Generamos socket como un objeto. Porque los objetos se guardan como referencia que es equivalencia a los punteros de C

// function connect(server) {
//     socket.io = socketIO(server) //De esta manera es como si estaríamos inicializando 'io' dentro de la variable socket.
// }

function connect(io) {
    socket.io = io //De esta manera es como si estaríamos inicializando 'io' dentro de la variable socket.
}

module.exports = {
    connect,
    socket
}