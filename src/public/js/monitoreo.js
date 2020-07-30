var temperatura1 = document.getElementById('temperatura1');
var humedad1 = document.getElementById('humedad1');

var temperatura2 = document.getElementById('temperatura2');
var humedad2 = document.getElementById('humedad2');

var proTemperatura = document.getElementById('proTemperatura');
var proHumedad = document.getElementById('proHumedad');


const socketio = io();

socketio.on("sensores", datos => {
    console.log(datos)

    temperatura1.innerHTML = datos.temperatura1;
    humedad1.innerHTML = datos.humedad1;

    temperatura2.innerHTML = datos.temperatura2;
    humedad2.innerHTML = datos.humedad2;

    proTemperatura.innerHTML = (datos.temperatura1 + datos.temperatura2)/2

    proHumedad.innerHTML = (datos.humedad1 + datos.humedad2)/2
})