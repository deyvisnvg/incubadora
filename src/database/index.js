'use strict'

const db = require('./lib/db');
const setupUsuarioModel = require('./models/usuario');
const setupPersonaModel = require('./models/persona');
const setupIncubadoraModel = require('./models/incubadora');
const setupTipoSensorModel = require('./models/tipo_sensor');

const setupUsuario = require('./lib/usuario');
const setupPersona = require('./lib/persona');
const setupIncubadora = require('./lib/incubadora');
const setupTipoSensor = require('./lib/tipo_sensor');

module.exports = async config => {

    const sequelize = db(config);
    const UsuarioModel = setupUsuarioModel(config);
    const PersonaModel = setupPersonaModel(config);
    const IncubadoraModel = setupIncubadoraModel(config);
    const TipoSensorModel = setupTipoSensorModel(config);

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
    const Incubadora = setupIncubadora(IncubadoraModel);
    const TipoSensor = setupTipoSensor(TipoSensorModel);

    return {
        Usuario,
        Persona,
        Incubadora,
        TipoSensor
    }
}