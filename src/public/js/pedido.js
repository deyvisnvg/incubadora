var empresa = document.getElementById("empresa");
var contador = 0;
//const socketio = io();

//============= Evento que permite la Visualización de sus empresas_asociadas según el Representante Seleccionado =============//
function showSelectedRepre() {
    var id_representante = document.getElementById("selectBuscador");

    if (id_representante.value) {
        console.log(id_representante.value);
        socketio.emit("op:representante", id_representante.value);
    } else {
        console.log("Valor no válido")
    }
}

const viewEmpresa = m => {
    let data = `<option value="${m.id_representante_empresa}">${m['empresa.nombre_empresa']}</option>`
    return data;
}

socketio.on("data:empresa", result => {
    console.log("hola", result);

    if (result.length > 0) {
        var datos = result.map(viewEmpresa);
    }

    let select = `<p class="description">Empresa:</p>
                  <p>
                    <select name="id_representante_empresa">
                        <option value="">Seleccione...</option>
                        ${datos}
                    </select>
                  </p>`
    empresa.innerHTML = select;
})
//=============================================================================//