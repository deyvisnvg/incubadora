var temperatura1 = document.getElementById('temperatura1');
var humedad1 = document.getElementById('humedad1');

var temperatura2 = document.getElementById('temperatura2');
var humedad2 = document.getElementById('humedad2');

var proTemperatura = document.getElementById('proTemperatura');
var proHumedad = document.getElementById('proHumedad');

const socketio = io();

var estado = 0;

socketio.on("sensores", datos => {
    console.log(datos)
    estado = 1

    temp1 = parseInt(datos.temperatura1);
    hum1 = parseInt(datos.humedad1);
    temp2 = parseInt(datos.temperatura2);
    hum2 = parseInt(datos.humedad2);
    proTemp = datos.proTemp;
    proHum = datos.proHum;

    //----------------------------------------------------------------//

    temperatura1.innerHTML = temp1;
    humedad1.innerHTML = hum1;
    temperatura2.innerHTML = temp2;
    humedad2.innerHTML = hum2;

    proTemperatura.innerHTML = proTemp;
    proHumedad.innerHTML = proHum;
    
})

setTimeout(() => {
    if (estado === 0) {
        temperatura1.innerHTML = 0;
        humedad1.innerHTML = 0;
        temperatura2.innerHTML = 0;
        humedad2.innerHTML = 0;

        proTemperatura.innerHTML = 0;
        proHumedad.innerHTML = 0;
    }
}, 1500);