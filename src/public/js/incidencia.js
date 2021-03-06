var fechaInicio = document.getElementById('fechaInicio');
var result = document.getElementById('result');
// const result = document.querySelector('.result'); //Se utiliza con Class

function evaluarFechaInicio(event) {
    console.log(event);
    if (event.target.value) {
        result.innerHTML = `<input type="date" name="fechaFin" id="" value="" required>`;
    } else {
        result.innerHTML = `<input type="date" name="fechaFin" id="" value="">`;
    }
}

fechaInicio.addEventListener('change', evaluarFechaInicio);
result.innerHTML = `<input type="date" name="fechaFin" id="" value="">`;