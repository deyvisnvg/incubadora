var temperatura = document.getElementById('temperatura');
var humedad = document.getElementById('humedad');

const socketio = io();

socketio.on("sensores", datos => {
    console.log(datos)
    temperatura.innerHTML = datos.temperatura;
    humedad.innerHTML = datos.humedad;
})