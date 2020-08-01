var temperatura1 = document.getElementById('temperatura1');
var humedad1 = document.getElementById('humedad1');

var temperatura2 = document.getElementById('temperatura2');
var humedad2 = document.getElementById('humedad2');

var proTemperatura = document.getElementById('proTemperatura');
var proHumedad = document.getElementById('proHumedad');

const socketio = io();


var estado = 0;
var estado_data = 0;

socketio.on("sensores", datos => {
    console.log(datos)

    estado_data = estado_data + 1;

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


setInterval(() => {
    if (estado === estado_data) {
        temperatura1.innerHTML = 0;
        humedad1.innerHTML = 0;
        temperatura2.innerHTML = 0;
        humedad2.innerHTML = 0;

        proTemperatura.innerHTML = 0;
        proHumedad.innerHTML = 0;
    }

    estado = estado_data;

}, 5000);


$(function () {
    $('.iconzoom').click(() => {

        console.log('bien')
        var menu = document.querySelector('.container-sensorRealTime')

        if (menu.classList.contains('is-active')) {
            menu.classList.remove('is-active');
        } else {
            menu.classList.add('is-active');
        }
    })
})

$(function () {
    $('.iconzoom-two').click(() => { // Cuando haya un evento de Click en tal índice me imprimirá solo el texto del 'div' en ese índice.

        var menu = document.querySelector('.container-sensorRealTime')

        if (menu.classList.contains('is-active')) {
            menu.classList.remove('is-active');
        }

    });
})
