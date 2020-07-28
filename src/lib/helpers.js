const bcrypt = require('bcryptjs'); //Una biblioteca para ayudarte a contraseñas hash.

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //Genera un cifrado hash
  const hash = await bcrypt.hash(password, salt); //Cifra mi password  basado en esa cadena generado
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => { //Esto es para el login
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;
