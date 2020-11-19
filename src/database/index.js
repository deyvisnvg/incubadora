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
const setupDataSensorModel = require('./models/data_sensor')
const setupRepresentanteEmpresaModel = require('./models/representante_empresa')

const setupUsuario = require('./lib/usuario');
const setupPersona = require('./lib/persona');
const setupIncubadora = require('./lib/incubadora');
const setupTipoSensor = require('./lib/tipo_sensor');
const setupSensor = require('./lib/sensor');
const setupEmpresa = require('./lib/empresa');
const setupRepresentante = require('./lib/representante');
const setupPedido = require('./lib/pedido');
const setupIncubacion = require('./lib/incubacion');
const setupDataSensor = require('./lib/data_sensor');
const setupRepresentanteEmpresa = require('./lib/representante_empresa');

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
    const DataSensorModel = setupDataSensorModel(config);
    const RepresentanteEmpresaModel = setupRepresentanteEmpresaModel(config);
    
    //--------------------------- Persona ---------------------------//
    UsuarioModel.hasOne(PersonaModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // Un "Usuario" "Tiene un" "Persona"
    PersonaModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // Una persona "Pertenece a " un "Usuario"
    
    //--------------------------- Representante ---------------------------//
    PersonaModel.hasOne(RepresentanteModel, { foreignKey: 'id_persona', sourceKey: 'dni_persona' })
    RepresentanteModel.belongsTo(PersonaModel, { foreignKey: 'id_persona', sourceKey: 'dni_persona' })

    //--------------------------- Representante - Empresa ---------------------------//
        // This creates a junction table `Representante_Empresa` with fields `idRepresentante` and `idEmpresa`, foreignKey: 'id_representante_empresa', sourceKey: 'id_representante', targetKey: 'ruc_empresa'
    RepresentanteModel.belongsToMany(EmpresaModel, { through: RepresentanteEmpresaModel, foreignKey: 'id_representante', otherKey: 'id_empresa'});
    EmpresaModel.belongsToMany(RepresentanteModel, { through: RepresentanteEmpresaModel, foreignKey: 'id_empresa', otherKey: 'id_representante'});
    
    RepresentanteModel.hasMany(RepresentanteEmpresaModel, { foreignKey: 'id_representante', sourceKey: 'id_representante' })
    RepresentanteEmpresaModel.belongsTo(RepresentanteModel, { foreignKey: 'id_representante', sourceKey: 'id_representante' })

    EmpresaModel.hasMany(RepresentanteEmpresaModel, { foreignKey: 'id_empresa', sourceKey: 'ruc_empresa' })
    RepresentanteEmpresaModel.belongsTo(EmpresaModel, { foreignKey: 'id_empresa', sourceKey: 'ruc_empresa' })

    //--------------------------- Representante_Empresa - Pedido ---------------------------//
    RepresentanteEmpresaModel.hasMany(PedidoModel, { foreignKey: 'id_representante_empresa', sourceKey: 'id_representante_empresa' })
    PedidoModel.belongsTo(RepresentanteEmpresaModel, { foreignKey: 'id_representante_empresa', sourceKey: 'id_representante_empresa' })

    //--------------------------- Incubadora ---------------------------//
    // Se añade una clave id_incubadora a la tabla SensorModel
    IncubadoraModel.hasMany(SensorModel, { foreignKey: 'id_incubadora', sourceKey: 'id_incubadora' })
    // Se añade una clave id_incubadora a la tabla SensorModel
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
    const Persona = setupPersona(PersonaModel, UsuarioModel, RepresentanteModel, EmpresaModel, RepresentanteEmpresaModel);
    const Representante = setupRepresentante(RepresentanteModel, PersonaModel, EmpresaModel, UsuarioModel);
    const Incubadora = setupIncubadora(IncubadoraModel);
    const TipoSensor = setupTipoSensor(TipoSensorModel);
    const Sensor = setupSensor(SensorModel, TipoSensorModel, IncubadoraModel);
    const Empresa = setupEmpresa(EmpresaModel, RepresentanteEmpresaModel);
    const Pedido = setupPedido(PedidoModel, RepresentanteEmpresaModel, EmpresaModel, RepresentanteModel, PersonaModel);
    const Incubacion = setupIncubacion(IncubacionModel, PedidoModel, IncubadoraModel, RepresentanteEmpresaModel, RepresentanteModel, PersonaModel, EmpresaModel);
    const DataSensor = setupDataSensor(DataSensorModel);
    const RepresentanteEmpresa = setupRepresentanteEmpresa(RepresentanteEmpresaModel, EmpresaModel);

    return {
        Usuario,
        Persona,
        Representante,
        Incubadora,
        TipoSensor,
        Sensor,
        Empresa,
        Pedido,
        Incubacion,
        DataSensor,
        RepresentanteEmpresa
    }
}