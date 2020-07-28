'use strict'

const db = require('./lib/db');
const setupUsuarioModel = require('./models/usuario');
const setupPersonaModel = require('./models/persona');
// const setupProductoModel = require('./models/producto');
const setupIncubadoraModel = require('./models/incubadora');

const setupUsuario = require('./lib/usuario');
const setupPersona = require('./lib/persona');
// const setupProducto = require('./lib/producto');
const setupIncubadora = require('./lib/incubadora');

module.exports = async config => {

    const sequelize = db(config);
    const UsuarioModel = setupUsuarioModel(config);
    const PersonaModel = setupPersonaModel(config);
    // const ProductoModel = setupProductoModel(config);
    const IncubadoraModel = setupIncubadoraModel(config);

    PersonaModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // El modelo de Usuario 'pertenece a' una persona

    // CoordenadaModel.hasMany(DeviceModel, {foreignKey: 'id_dispositivo', sourceKey: 'id_dispositivo'}) // Un dispositivo 'tiene muchas' coordenadas
    // DeviceModel.belongsTo(CoordenadaModel, {foreignKey: 'id_dispositivo', sourceKey: 'id_dispositivo'}) // Una coordenada 'pertenece a' un dispositivo
    
    // PersonaModel.belongsTo(UsuarioModel, { foreingKey: 'id_usuario', sourceKey: 'id_usuario' }) // El modelo de Usuario 'pertenece a' una persona
    // UsuarioModel.belongsTo(PersonaModel, { foreingKey: 'id_usuario', sourceKey: 'id_usuario' }) // El modelo de Persona 'pertenece a' un usuario

    // Project.hasMany(Task, { foreingKey: 'projectId', sourceKey: 'id' }) // sourceKey: 'id' = Llave de origen
    // Task.belongsTo(Project, { foreingKey: 'projectId', sourceKey: 'id' })

    await sequelize.authenticate() //Validamos que la base de datos esta bien configurada, para verificar si hay una conexion directa con la base de datos

    const Usuario = setupUsuario(UsuarioModel, PersonaModel);
    const Persona = setupPersona(PersonaModel, UsuarioModel);
    // const Producto = setupProducto(ProductoModel);
    const Incubadora = setupIncubadora(IncubadoraModel);

    return {
        Usuario,
        Persona,
        Incubadora
    }
}