const valor = document.getElementById('valor');

var id;

(function generateID() {
    id = + new Date() + Math.floor(Math.random() * 1000);
})()

if (valor.value == "pedido") {
    const pedido1 = document.getElementById('idPedido');
    pedido1.value = "Ped_" + id;
} else if (valor.value == "incubacion") {
    const incubacion1 = document.getElementById('idIncubacion');
    incubacion1.value = "Incub_" + id;
} else if (valor.value == "representante") {
    const incubacion1 = document.getElementById('idRepresentante');
    incubacion1.value = "Rep_" + id;
} else if (valor.value == "incidencia") {
    const incubacion1 = document.getElementById('idIncidencia');
    incubacion1.value = "Incid_" + id;
}

// JavaScript almacena las fechas como número de milisegundos desde 
// el 1 de enero de 1970 a las 00:00:00 UTC (hora universal coordinada).