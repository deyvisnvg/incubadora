'use strict'

const db = require('./lib/db');
const setupUsuarioModel = require('./models/usuario');
const setupPersonaModel = require('./models/persona');
const setupIncubadoraModel = require('./models/incubadora');
const setupTipoSensorModel = require('./models/tipo_sensor');
const setupSensorModel = require('./models/sensor');
const setupEmpresaModel = require('./models/empresa')
const setupRepresentanteModel = require('./models/representante')
const setupPedidoModel = require('./models/pedido')
const setupIncubacionModel = require('./models/incubacion')

const setupUsuario = require('./lib/usuario');
const setupPersona = require('./lib/persona');
const setupIncubadora = require('./lib/incubadora');
const setupTipoSensor = require('./lib/tipo_sensor');
const setupSensor = require('./lib/sensor');
const setupEmpresa = require('./lib/empresa');
const setupRepresentante = require('./lib/representante');
const setupPedido = require('./lib/pedido');
const setupIncubacion = require('./lib/incubacion');

module.exports = async config => {

    const sequelize = db(config);
    const UsuarioModel = setupUsuarioModel(config);
    const PersonaModel = setupPersonaModel(config);
    const IncubadoraModel = setupIncubadoraModel(config);
    const TipoSensorModel = setupTipoSensorModel(config);
    const SensorModel = setupSensorModel(config);
    const EmpresaModel = setupEmpresaModel(config);
    const RepresentanteModel = setupRepresentanteModel(config);
    const PedidoModel = setupPedidoModel(config);
    const IncubacionModel = setupIncubacionModel(config);
    
    //--------------------------- Persona ---------------------------//
    UsuarioModel.hasOne(PersonaModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // Un "Usuario" "Tiene un" "Persona"
    PersonaModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // Una persona "Pertenece a " un "Usuario"
    
    PersonaModel.hasMany(PedidoModel, { foreignKey: 'id_persona', sourceKey: 'id_persona' })
    PedidoModel.belongsTo(PersonaModel, { foreignKey: 'id_persona', sourceKey: 'id_persona' })
    
    //--------------------------- Representante ---------------------------//
    PersonaModel.hasOne(RepresentanteModel, { foreignKey: 'id_persona', sourceKey: 'id_persona' })
    RepresentanteModel.belongsTo(PersonaModel, { foreignKey: 'id_persona', sourceKey: 'id_persona' })

    EmpresaModel.hasMany(RepresentanteModel, { foreignKey: 'id_empresa', sourceKey: 'id_empresa' })
    RepresentanteModel.belongsTo(EmpresaModel, { foreignKey: 'id_empresa', sourceKey: 'id_empresa' })

    //--------------------------- Incubadora ---------------------------//
    IncubadoraModel.hasMany(SensorModel, { foreignKey: 'id_incubadora', sourceKey: 'id_incubadora' })
    SensorModel.belongsTo(IncubadoraModel, { foreignKey: 'id_incubadora', sourceKey: 'id_incubadora' })
    
    //--------------------------- Sensores ---------------------------//
    TipoSensorModel.hasMany(SensorModel, { foreignKey: 'id_tipoSensor', sourceKey: 'id_tipoSensor' }) //Un "Tipo de Sensor" "tiene muchos" "Sensores" definidos
    SensorModel.belongsTo(TipoSensorModel, { foreignKey: 'id_tipoSensor', sourceKey: 'id_tipoSensor' }) //Uno y muchos "Sensores" "Pertenece a" un "Tipo de Sensor"

    //--------------------------- incubacion ---------------------------//
    IncubadoraModel.hasMany(IncubacionModel, { foreignKey: 'id_incubadora', sourceKey: 'id_incubadora' })
    IncubacionModel.belongsTo(IncubadoraModel, { foreignKey: 'id_incubadora', sourceKey: 'id_incubadora' })

    PedidoModel.hasMany(IncubacionModel, { foreignKey: 'id_pedido', sourceKey: 'id_pedido' })
    IncubacionModel.belongsTo(PedidoModel, { foreignKey: 'id_pedido', sourceKey: 'id_pedido' })
    
    
    await sequelize.authenticate() //Validamos que la base de datos esta bien configurada, para verificar si hay una conexion directa con la base de datos

    const Usuario = setupUsuario(UsuarioModel, PersonaModel);
    const Persona = setupPersona(PersonaModel, UsuarioModel, RepresentanteModel, EmpresaModel);
    const Representante = setupRepresentante(RepresentanteModel, PersonaModel, EmpresaModel, UsuarioModel);
    const Incubadora = setupIncubadora(IncubadoraModel);
    const TipoSensor = setupTipoSensor(TipoSensorModel);
    const Sensor = setupSensor(SensorModel, TipoSensorModel, IncubadoraModel);
    const Empresa = setupEmpresa(EmpresaModel);
    const Pedido = setupPedido(PedidoModel, PersonaModel, UsuarioModel);
    const Incubacion = setupIncubacion(IncubacionModel, PedidoModel, IncubadoraModel);

    return {
        Usuario,
        Persona,
        Representante,
        Incubadora,
        TipoSensor,
        Sensor,
        Empresa,
        Pedido,
        Incubacion
    }
}