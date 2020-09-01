const { handleError } = require('../../error');

module.exports = {

    addSensor: (body, Sensor) => {
        return new Promise(async (resolve, reject) => {

            const newSensor = {
                nombre_sensor: body.nombre_sensor,
                estado: body.estado,
                id_incubadora: body.incubadora,
                id_tipoSensor: body.tipo_sensor,
            }

            // console.log(newSensor);

            await Sensor.addSensor(newSensor).catch(handleError);
            resolve();

        })
    },

    listSensor: (Sensor) => { //Continuar
        return new Promise(async (resolve, reject) => {
            const sensor = await Sensor.findSensorAll().catch(err => handleError(err));

            // console.log(sensor);
            resolve(sensor);
        })
    },

    listIncubadoraTipoSensor: (Incubadora, TipoSensor) => {
        return new Promise(async (resolve, reject) => {
            const incubadora = await Incubadora.findIncubadoraAllOn().catch(err => handleError(err));
            const tipoSensor = await TipoSensor.findtipoSensorAll().catch(err => handleError(err));

            let data = {};

            let dataTipoSensor = tipoSensor.map(m => {
                let dataTipoSensor = {
                    id_tipoSensor: m.id_tipoSensor,
                    tipo_sensor: m.tipo_sensor,
                }
                return dataTipoSensor;
            })

            data.dataIncubadora = incubadora;
            data.dataTipoSensor = dataTipoSensor;

            // console.log(data);
            resolve(data);
        })
    },

    addTipoSensor: function (body, TipoSensor) {
        return new Promise(async (resolve, reject) => {

            const newTipoSensor = {
                tipo_sensor: body.tipo_sensor,
                simbolo: body.simbolo,
                limite: body.limite,
                ambiente: body.ambiente,
            }

            // console.log(newTipoSensor);

            await TipoSensor.addtipoSensor(newTipoSensor).catch(handleError);
            resolve();

        })
    },

    listTipoSensor: TipoSensor => {
        return new Promise(async (resolve, reject) => {
            const tipoSensor = await TipoSensor.findtipoSensorAll().catch(err => handleError(err));

            let data = tipoSensor.map(m => {
                let dataTipoSensor = {
                    id_tipoSensor: m.id_tipoSensor,
                    tipo_sensor: m.tipo_sensor,
                    simbolo: m.simbolo,
                    limite: m.limite,
                    ambiente: m.ambiente
                }
                return dataTipoSensor;
            })

            // console.log(data);
            resolve(data);
        })
    },

    // editUser: function (id_persona, id_usuario, Usuario, Persona) {
    //     return new Promise(async (resolve, reject) => {
    //         if (!id_persona && !id_usuario) {
    //             reject("Las id no se recibieron");
    //             return false;
    //         }

    //         try {
    //             const user = await Usuario.findUsuarioId(id_usuario);
    //             const persona = await Persona.findPersonaId(id_persona);
    //             let data = {
    //                 usuario: user.toJSON(),
    //                 persona
    //             }
    //             resolve(data);

    //         } catch (err) {
    //             reject('[Error!]:', err);
    //         }

    //     })
    // },

    // updateUser: function (ids, user, file, Usuario, Persona) {
    //     return new Promise(async (resolve, reject) => {
    //         let nameFoto;

    //         if (typeof file !== 'undefined') {
    //             nameFoto = config.filesRoute + '/' + file.originalname;
    //         } else {
    //             nameFoto = user.foto;
    //         }

    //         console.log(user);

    //         const dataPersona = {
    //             nombres: user.nombres,
    //             apellidos: user.apellidos,
    //             edad: user.edad,
    //             email: user.email,
    //             fecha_nacimiento: user.fecha_nacimiento,
    //             foto: nameFoto
    //         }

    //         const dataUser = {
    //             usuario: user.usuario,
    //             modulo: user.modulo,
    //         }

    //         if (typeof user.password !== 'undefined' && user.password) {
    //             dataUser.password = await helpers.encryptPassword(user.password)
    //         }

    //         try {
    //             await Persona.updatePersonaId(ids.id_persona, dataPersona);
    //             await Usuario.updateUsuarioId(ids.id_usuario, dataUser);
    //             resolve();
    //         } catch (err) {
    //             reject("Error! al modificar, Inténtelo nuevamente.");
    //         }
    //     })
    // },


}