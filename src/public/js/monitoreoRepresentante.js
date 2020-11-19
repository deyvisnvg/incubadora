// const { dateFormatDMY } = require('../../dateFormatUtc');

//============= Evento que se ejecuta al Seleccionar una Opcion de Empresa =============//
var pedidos = document.getElementById("pedidos");

function showSelectedEmpresa() {
    var id_representante_empresa = document.getElementById("selectBuscador");

    if (id_representante_empresa.value) {
        console.log(id_representante_empresa.value);
        socketio.emit("op:buscar_pedido", id_representante_empresa.value);
    } else {
        console.log("Datos Vacíos");
    }
}

const viewPedido = m => {
    // let fecha_pedido = dateFormatDMY(m.fecha_pedido);
    // console.log(fecha_pedido);
    let data = `<option value="${m.id_pedido}">${m.id_pedido}</option>`
    return data;
}

socketio.on("data:buscar_pedido", result => {
    console.log("hola", result);

    if (result.length > 0) {
        var datos = result.map(viewPedido);
    }

    let select = `<p class="description">Pedido:</p>
                  <p>
                    <select name="id_pedido">
                        <option value="" style="background: #9c9c9c; color: #fff">Seleccione...</option>
                        ${datos}
                    </select>
                  </p>`
    pedidos.innerHTML = select;
})