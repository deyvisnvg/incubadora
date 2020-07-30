var temperatura1 = document.getElementById('temperatura1');
var humedad1 = document.getElementById('humedad1');

var temperatura2 = document.getElementById('temperatura2');
var humedad2 = document.getElementById('humedad2');

var proTemperatura = document.getElementById('proTemperatura');
var proHumedad = document.getElementById('proHumedad');


const socketio = io();

socketio.on("sensores", datos => {
    console.log(datos)

    temp1 = parseInt(datos.temperatura1);
    hum1 = parseInt(datos.humedad1);
    temp2 = parseInt(datos.temperatura2);
    hum2 = parseInt(datos.humedad2);

    //----------------------------------------------------------------//

    temperatura1.innerHTML = temp1;
    humedad1.innerHTML = hum1;
    temperatura2.innerHTML = temp2;
    humedad2.innerHTML = hum2;

    proTemperatura = (temp1 + temp2) / 2;
    proHumedad = (hum1 + hum2) / 2;
})