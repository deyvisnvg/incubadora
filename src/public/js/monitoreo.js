var temperatura = document.getElementById('temperatura');
var humedad = document.getElementById('humedad');

var proTemperatura = document.getElementById('proTemperatura');
var proHumedad = document.getElementById('proHumedad');

let socketio = io();
var estado = 0;
var estado_data = 0;
let sensorTemp, sensorHumed, promedios, proTemp, proHum

//============= Evento que Muestra la Data de Sensores =============//
socketio.on("sensores", datos => {
    console.log(datos);
    estado_data = estado_data + 1;

    sensorTemp = datos.sensorTemp
    sensorHumed = datos.sensorHumed
    promedios = datos.promedios

    proTemp = promedios[0].proTemp;
    proHum = promedios[0].proHum;

    //----------------------------------------------------------------//

    let contenedorTemp = sensorTemp.map(temperatura => {
        let data = `
        <div class="data-one temperatura">
        <div> ${temperatura.nombre_sensor}: </div>
        <div class="valor"> ${temperatura.valor} </div>
        </div>`

        return data;
    })

    let contenedorHum = sensorHumed.map(humedad => {
        let data = `
        <div class="data-one humedad">
            <div> ${humedad.nombre_sensor}: </div>
            <div class="valor"> ${humedad.valor} </div>
        </div>`

        return data;
    })

    temperatura.innerHTML = contenedorTemp.join("");
    humedad.innerHTML = contenedorHum.join("");
    proTemperatura.innerHTML = proTemp;
    proHumedad.innerHTML = proHum;

})

//============= Valida si la Data es True =============//
setInterval(() => {
    if (estado === estado_data) {
        temperatura.innerHTML = `
        <div class="data-one temperatura">
        <div> Sensor Desconectado </div>
        </div>`;

        humedad.innerHTML = `
        <div class="data-one humedad">
        <div> Sensor Desconectado </div>
        </div>`;

        proTemperatura.innerHTML = 0;
        proHumedad.innerHTML = 0;
    }

    estado = estado_data;

}, 5000);

//============= Funcion Query que Permite Mostrar y Cerrar Ventana de Sensores =============//
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