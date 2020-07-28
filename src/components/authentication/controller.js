const auth = require('../../auth');
const helpers = require('../../lib/helpers');
const db = require('../../database');
const { configDb } = require('../../config')
const { handleFatalError, handleError } = require('../../error');

let Usuario;

module.exports = {
    login: (user, pass) => {
        return new Promise(async (resolve, reject) => {
            const services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
            Usuario = services.Usuario

            const dataUsuario = await Usuario.findUsuario(user).catch(handleError);

            if (dataUsuario) {
                let dataUser = dataUsuario.toJSON();
                const validarPass = await helpers.matchPassword(pass, dataUser.password);

                if (validarPass) {
                    delete dataUser.password;
                    //Generar Token
                    return resolve(auth.sign(dataUser));
                } else {
                    reject("Contraseña incorrecta");
                }
            } else {
                reject("El usuario no existe");
            }
        })
    }
}