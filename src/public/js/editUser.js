var outputEditUser = document.getElementById("outputEditUser");
var moduloEditUser = document.getElementById("moduloEditUser");

var casillaPass = document.getElementById("casillaPass");
var check = document.getElementById("check");

switch (moduloEditUser.value) {

    case "SuperAdministrador":
        outputEditUser.innerHTML += `
            <p class="description">Modulo: </p>
            <p>
                <select name="modulo" required>
                    <option value="${moduloEditUser.value}">Super Administrador</option>
                </select>
            </p>
        `
        break;

    case "Administrador":
        outputEditUser.innerHTML += `
            <p class="description">Modulo: </p>
            <p>
                <select name="modulo" required>
                    <option value="${moduloEditUser.value}">${moduloEditUser.value}</option>
                    <option value="Empleado">Empleado</option>
                </select>
            </p>
        `
        break;
    
    case "Empleado":
        outputEditUser.innerHTML += `
            <p class="description">Modulo: </p>
            <p>
                <select name="modulo" required>
                    <option value="${moduloEditUser.value}">${moduloEditUser.value}</option>
                    <option value="Administrador">Administrador</option>
                </select>
            </p>
        `
        break;

    default:
        break;
}

check.addEventListener('click', habilitar)

function habilitar() {
    const opcion = confirm("Se eliminará el password existente! \nEsta seguro que desea editar su Contraseña!");

    if (opcion == true) {
        casillaPass.disabled = false;
        check.checked = true;
        casillaPass.value = "";
    } else {
        casillaPass.disabled = true;
        check.checked = false;
    }
}