let outputUser = document.getElementById("outputUser");
let moduloUser = document.getElementById("moduloUser");

switch (moduloUser.value) {

    case "SuperAdministrador":
        outputUser.innerHTML += `
            <p class="description">Tipo de usuario:</p>
            <p>
                <select name="modulo" required>
                    <option value="">Seleccione...</option>
                    <option value="SuperAdministrador">Super Administrador</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                </select>
            </p>
        `
        break;

    case "Administrador":
        outputUser.innerHTML += `
            <p class="description">Tipo de usuario:</p>
            <p>
                <select name="modulo" required>
                    <option value="">Seleccione...</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                </select>
            </p>
        `
        break;

    default:
        break;
}