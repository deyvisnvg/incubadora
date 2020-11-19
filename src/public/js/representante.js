//============= Evento que se ejecuta al Seleccionar una Opcion de Representante =============//
function myFunctionAsociar() {
    var id_empresa = document.getElementById("selectBuscador");
    var id_representante = document.getElementById("id_representante");
    
    data = {
        id_representante: id_representante.value,
        id_empresa: id_empresa.value,
        estado: 'Activo'
    }

    console.log(data);

    if (id_empresa.value && id_representante.value) {
        socketio.emit("op:empresa_asociar", data);
    } else {
        console.log("Faltan datos");
    }
}

socketio.on("op:empresa_asociar", state => {
    if (state) {
        location.reload();
    }
})