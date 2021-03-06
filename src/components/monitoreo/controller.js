const { socket } = require('../../socket');
const { handleError } = require('../../error');
const { dateFormatYMD, dateFormatHms, dateFormatDMY } = require('../../dateFormatUtc');

module.exports = {

    recivedDataSensor: (data, Sensor, DataSensor) => {
        return new Promise(async (resolve, reject) => {

            let sensorTemp = null;
            let sensorHumed = null;
            let promedios = [];

            if (!sensorTemp) {
                sensorTemp = await Sensor.findSensorTemperatura().catch(err => handleError(err));
            }

            if (!sensorHumed) {
                sensorHumed = await Sensor.findSensorHumedad().catch(err => handleError(err));
            }

            // =====================================================================================
            // RECIBO DATOS DEL ARDUINO Y LOS ORDENO POR TEMPERATURAS, HUMEDAD Y PROMEDIOS DE AMBOS
            // =====================================================================================
            let m = data.split('&')

            let temperatura_s = m[0];
            let humedad_s = m[1];
            let proTempHumed_s = m[2];

            let temperatura = temperatura_s.split(',')
            let humedad = humedad_s.split(',')
            let proTempHumed = proTempHumed_s.split(',')

            let promedio = {
                proTemp: proTempHumed[0],
                proHum: proTempHumed[1],
                contador: proTempHumed[2],
                fecha: dateFormatYMD()
            }

            // =====================================================================================
            // GUARDO CADA VALOR RECIBIDO DEL ARDUINO EN CADA SENSOR DE TEMP, HUM Y PROMEDIOS
            // =====================================================================================
            for (const i in sensorTemp) {
                sensorTemp[i].valor = temperatura[i]
                sensorTemp[i].fecha = dateFormatYMD();
                sensorTemp[i].hora = dateFormatHms();
            }

            for (const i in sensorHumed) {
                sensorHumed[i].valor = humedad[i]
                sensorHumed[i].fecha = dateFormatYMD();
                sensorHumed[i].hora = dateFormatHms();
            }

            promedios.push(promedio);

            // =====================================================================================

            console.log(temperatura)
            console.log(humedad)
            console.log(proTempHumed)

            console.log("------------")

            let datos = {
                sensorTemp,
                sensorHumed,
                promedios
            }

            console.log(datos)

            if (datos) {
                socket.io.emit("sensores", datos);
            }


            if (proTempHumed[2] == 61) {
                await DataSensor.addDataSensorTemp(sensorTemp).catch(err => handleError(err));
                await DataSensor.addDataSensorHum(sensorHumed).catch(err => handleError(err));
            }

            resolve();
        })
    },

    filtroMonitoreo: (user, Pedido) => {
        return new Promise(async (resolve, reject) => {
            let data = {}

            if (user.modulo == 'Representante_Legal') {
                const representanteEmpresa = await Persona.findRepresentanteEmpresaMonitoreo(user.id_usuario).catch(err => handleError(err));

                console.log(representanteEmpresa);
                try {
                    data.representanteEmpresa = representanteEmpresa;
                    resolve(data);
                } catch (error) {
                    reject('[Error!]: No se pudo obtener los datos para el registro incubacion' + error);
                }
            } else {
                const pedido = await Pedido.findPedidoAllOn().catch(err => handleError(err));
                try {
                    data.pedido = pedido;
                    resolve(data);
                } catch (error) {
                    reject('[Error!]: No se pudo obtener los datos para el registro incubacion' + error);
                }
            }

            // let data = [];
            // let id_pedidos = {};
            // let data = new Object();
            // let fecha_actual = new Date(dateFormatYMD()).getTime();
            // console.log(Object.keys(data).length);
            // const incubacion = await Incubacion.findIncubacionDataPersona().catch(err => handleError(err));

            // console.log(incubacion);
            // for (const i in incubacion) {
            //     let data_general = {};
            //     let data_incubacion = [];
            //     let incubaciones = {};
            //     // let fecha_salida = new Date(incubacion[i].fecha_salida).getTime();
            //     // let hora_restante = (fecha_salida - fecha_actual) / (1000 * 60 * 60 * 24);

            //     // incubacion[i].dia_incubacion = hora_restante;
            //     // incubacion[i].fecha_ingreso = dateFormatDMY(incubacion[i].fecha_ingreso);
            //     // incubacion[i].fecha_salida = dateFormatDMY(incubacion[i].fecha_salida);

            //     // Guardo la id del pedido segun va llegando
            //     id_pedidos['id_pedido' + i] = incubacion[i]['pedido.id_pedido'];

            //     if(Object.keys(data).length < 1) {
            //         // Guardo la primera id del pedido cuando no haya data
            //         data['pedido_' + i] = {};
            //         data_general.id_pedido = incubacion[i]['pedido.id_pedido'];
            //         data_general.nombres = incubacion[i]['pedido.persona.nombres'];
            //         data_general.apellidos = incubacion[i]['pedido.persona.apellidos'];

            //         incubaciones.id_incubacion = incubacion[i].id_incubacion;
            //         incubaciones.fecha_ingreso = incubacion[i].fecha_ingreso;
            //         incubaciones.fecha_salida = incubacion[i].fecha_salida;
            //         incubaciones.hora_ingreso = incubacion[i].hora_ingreso;
            //         incubaciones.estado = incubacion[i].estado;
            //         incubaciones.piso_inicio = incubacion[i].piso_inicio;
            //         incubaciones.piso_fin = incubacion[i].piso_fin;
            //         incubaciones.cantidad_ingreso = incubacion[i].cantidad_ingreso;
            //         incubaciones.id_incubadora = incubacion[i]['incubadora.id_incubadora'];
            //         incubaciones.nombre_incubadora = incubacion[i]['incubadora.nombre_incubadora'];

            //         data_incubacion.push(incubaciones);
            //         data_general.incubacion = data_incubacion;
            //         data.push(data_general);

            //         // incubacion.id_pedido = incubacion[i]['pedido.id_pedido'];
            //         // incubacion.id_persona = incubacion[i]['pedido.persona.id_persona'];

            //         console.log("Hay data")
            //     } else {
            //         // id_pedidos['id_pedido' + i] = incubacion[i]['pedido.id_pedido'];
            //         // for (let i in id_pedidos) { 
            //         //     if (id_pedidos[i] == incubacion[i]['pedido.id_pedido']) {

            //         //         data['pedido_' + i].data = 
            //         //     }


            //         // }
            //         // console.log("No hay data")
            //     }

            // if (data['pedido_' + i].id_pedido == data['pedido_' + i - 1].id_pedido) {
            //     console.log();
            // } else {
            //     console.log();
            // }

            // if (!data['pedido_' + i].id_pedido) {
            //     data['pedido_' + i].id_pedido = incubacion[i]['pedido.id_pedido'];
            // } else {

            // }

            // if (!pedidos.id_pedido) {
            //     persona.id_persona = incubacion[i]['pedido.id_pedido'];
            // }
            // }

            // console.log(data);
            // console.log(id_pedidos);
            // console.log(data_incubacion);
            // try {
            //     data.pedido = pedido;

            //     if (incubacion.length < 1) {
            //         data.message = "No hay incubaciones activas para este Pedido";
            //         data.estado = "";
            //         resolve(data);
            //     } else {
            //         data.incubacion = incubacion;
            //         data.persona = persona;
            //         data.estado = true;
            //         console.log(data);
            //         resolve(data);
            //     }

            // } catch (error) {
            //     reject('[Error!]: No se pudo obtener los datos para el registro incubacion' + error);
            // }
        })
    },

    dataMonitoreo: (body, user, Incubacion, Pedido) => {
        return new Promise(async (resolve, reject) => {
            let data = {};

            if (user.modulo == 'Representante_Legal') {
                const representanteEmpresa = await Persona.findRepresentanteEmpresaMonitoreo(user.id_usuario).catch(handleError);
                data.representanteEmpresa = representanteEmpresa;
            } else {
                const pedido = await Pedido.findPedidoAllOn().catch(handleError);
                data.pedido = pedido;
            }

            try {
                const incubacion = await Incubacion.findIncubacionByPedidoIdDataPersona(body.id_pedido);
                let fecha_actual = new Date(dateFormatYMD()).getTime();

                let persona = {};

                for (const i in incubacion) {
                    let fecha_salida = new Date(incubacion[i].fecha_salida).getTime();
                    let hora_restante = (fecha_salida - fecha_actual) / (1000 * 60 * 60 * 24);

                    incubacion[i].dia_incubacion = hora_restante;

                    if (hora_restante <= 0) {
                        incubacion[i].estado = "Inactivo";

                        let dataActualEstado = {
                            estado: incubacion[i].estado
                        };

                        await Incubacion.updateIncubacionById(incubacion[i].id_incubacion, dataActualEstado).catch(err => handleError(err));
                    }

                    incubacion[i].fecha_ingreso = dateFormatDMY(incubacion[i].fecha_ingreso);
                    incubacion[i].fecha_salida = dateFormatDMY(incubacion[i].fecha_salida);

                    if (!persona.id_persona) {
                        persona.id_persona = incubacion[i]['pedido.representante_empresa.representante.persona.dni_persona'];
                    }

                    if (!persona.nombres) {
                        persona.nombres = incubacion[i]['pedido.representante_empresa.representante.persona.nombres'];
                    }

                    if (!persona.apellidos) {
                        persona.apellidos = incubacion[i]['pedido.representante_empresa.representante.persona.apellidos'];
                    }

                    if (!persona.pedido) {
                        persona.pedido = incubacion[i]['pedido.id_pedido'];
                    }
                }

                if (incubacion.length < 1) {
                    data.message = "No hay incubaciones activas para este Pedido";
                    data.estado = "";
                    resolve(data);
                } else {
                    data.incubacion = incubacion;
                    data.persona = persona;
                    data.estado = true;
                    console.log(data);
                    resolve(data);
                }

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos para el registro incubacion' + error);
            }
        })
    }
}