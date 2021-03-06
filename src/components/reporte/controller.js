const { dateFormatYMD } = require('../../dateFormatUtc');
const { handleError } = require('../../error');
const exportExcel = require('../../lib/exportar');
// const { generate } = require('../../generateCodigo');

module.exports = {
    listRepresentanteAll: (Persona) => {
        return new Promise(async (resolve, reject) => {
            let representante, filtro;
            let datos = {};

            try {
                representante = await Persona.findRepresentanteEmpresaAll();
                filtro = { reporte: 'representante' };

                datos.dataFinal = representante;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de los representantes');
            }
        })
    },

    listRepresentanteEstado: (body, Persona) => {
        return new Promise(async (resolve, reject) => {
            let representante, filtro;
            let datos = {};

            try {
                representante = await Persona.findRepresentanteEmpresaByEstado(body.estado);
                filtro = {
                    estado: body.estado,
                    reporte: 'representante'
                };

                datos.dataFinal = representante;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos del representante');
            }
        })
    },

    // ==================== Reporte Pedidos ==================== //
    listPedidoAll: (Pedido, Empresa) => {
        return new Promise(async (resolve, reject) => {
            let pedido, empresa, filtro;
            let datos = {};

            try {
                pedido = await Pedido.findPedidoAllReport();
                empresa = await Empresa.findEmpresaAll();
                filtro = { reporte: 'pedido' };

                datos.dataFinal = pedido;
                datos.dataEmpresa = empresa;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de los pedidos');
            }
        })
    },

    listPedidoFiltro: (body, Pedido, Empresa) => {
        return new Promise(async (resolve, reject) => {
            let pedido, filtro;
            let datos = {};
            // let filtroPedido = {};

            try {
                pedido = await Pedido.findPedidoByFiltroReport(body.empresa, body.estado);
                empresa = await Empresa.findEmpresaAll();
                filtro = {
                    empresa: body.empresa,
                    estado: body.estado,
                    reporte: 'pedido'
                };

                datos.dataFinal = pedido;
                datos.dataEmpresa = empresa;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos del pedido');
            }
        })
    },

    // ==================== Reporte Incubación ==================== //
    listIncubacionAll: (Incubacion, Pedido, Incubadora, Empresa) => {
        return new Promise(async (resolve, reject) => {
            let incubacion, empresa, incubadora, pedido, filtro;
            let datos = {};

            try {
                incubacion = await Incubacion.findIncubacionAllReport();

                pedido = await Pedido.findPedidoIdAllReport();
                empresa = await Empresa.findEmpresaAll();
                incubadora = await Incubadora.findIncubadoraAllReport();
                filtro = { reporte: 'incubacion' };

                datos.dataFinal = incubacion;
                datos.dataPedido = pedido;
                datos.dataEmpresa = empresa;
                datos.dataIncubadora = incubadora;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de los incubacion');
            }
        })
    },

    listIncubacionFiltro: (body, Incubacion, Pedido, Incubadora, Empresa) => {
        return new Promise(async (resolve, reject) => {
            let incubacion, empresa, incubadora, pedido, filtro;
            let datos = {};

            try {
                incubacion = await Incubacion.findIncubacionByFiltroReport(body.pedido, body.empresa, body.incubadora);
                
                pedido = await Pedido.findPedidoIdAllReport();
                empresa = await Empresa.findEmpresaAll();
                incubadora = await Incubadora.findIncubadoraAllReport();
                filtro = {
                    pedido: body.pedido,
                    empresa: body.empresa,
                    incubadora: body.incubadora,
                    reporte: 'incubacion'
                };

                datos.dataFinal = incubacion;
                datos.dataPedido = pedido;
                datos.dataEmpresa = empresa;
                datos.dataIncubadora = incubadora;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos del pedido');
            }
        })
    },

    // ==================== Reporte temperatura y humedad por modulo ==================== //
    listTempHumedadAll: (Incubacion, Incubadora) => {
        return new Promise(async (resolve, reject) => {
            let tempHumedad, incubadora, filtro;
            let datos = {};

            try {
                tempHumedad = await Incubacion.findTempHumedadAllReport();
                incubadora = await Incubadora.findIncubadoraAllReport();
                filtro = { reporte: 'temperatura_Humedad_por_modulo' };

                datos.dataFinal = tempHumedad;
                datos.dataIncubadora = incubadora;
                datos.filtro = filtro;

                resolve(datos);
                // console.log(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de temperatura y humedad por modulo' + error);
            }
        })
    },

    listTempHumedadFiltro: (body, Incubacion, Incubadora) => {
        return new Promise(async (resolve, reject) => {
            let tempHumedad, incubadora, filtro;
            let datos = {};

            try {
                tempHumedad = await Incubacion.findTempHumedadByFiltroReport(body.incubadora, body.fechaInicio, body.fechaFin);
                incubadora = await Incubadora.findIncubadoraAllReport();
                filtro = {
                    incubadora: body.incubadora,
                    fechaInicio: body.fechaInicio,
                    fechaFin: body.fechaFin,
                    reporte: 'temperatura_Humedad_por_modulo'
                };

                datos.dataFinal = tempHumedad;
                datos.dataIncubadora = incubadora;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de temperatura y humedad por modulo');
            }
        })
    },

    // ==================== Reporte Sensores ==================== //
    listSensoresAll: (DataSensor, TipoSensor) => {
        return new Promise(async (resolve, reject) => {
            let sensores, tipoSensor, filtro;
            let datos = {};

            try {
                sensores = await DataSensor.findSensoresAllReport();
                tipoSensor = await TipoSensor.findtipoSensorAllReport();
                filtro = { reporte: 'sensores' };

                datos.dataFinal = sensores;
                datos.dataTipoSensor = tipoSensor;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de los sensores');
            }
        })
    },

    listSensoresFiltro: (body, DataSensor, TipoSensor) => {
        return new Promise(async (resolve, reject) => {
            let sensores, tipoSensor, filtro;
            let datos = {};

            try {
                sensores = await DataSensor.findSensoresByFiltroReport(body.tipoSensor, body.fechaInicio, body.fechaFin);
                tipoSensor = await TipoSensor.findtipoSensorAllReport();
                filtro = {
                    tipoSensor: body.tipoSensor,
                    fechaInicio: body.fechaInicio,
                    fechaFin: body.fechaFin,
                    reporte: 'sensores'
                };

                datos.dataFinal = sensores;
                datos.dataTipoSensor = tipoSensor;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de los sensores' + error);
            }
        })
    },

    // ==================== Reporte Incidencia ==================== //
    listIncidenciaAll: (usuario, Incidencia, Incubadora) => {
        return new Promise(async (resolve, reject) => {
            let incidencia, incubadora, filtro;
            let datos = {};

            try {
                incidencia = await Incidencia.findIncidenciaAllReport();
                incubadora = await Incubadora.findIncubadoraAllReport();
                filtro = { reporte: 'incidencia' };

                for (let i = 0; i < incidencia.length; i++) {
                    incidencia[i].usuario = usuario
                }

                datos.dataFinal = incidencia;
                datos.dataIncubadora = incubadora;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de la incidencia');
            }
        })
    },

    listIncidenciaFiltro: (usuario, body, Incidencia, Incubadora) => {
        return new Promise(async (resolve, reject) => {
            let incidencia, incubadora, filtro;
            let datos = {};

            try {
                incidencia = await Incidencia.findIncidenciaByFiltroReport(body.incubadora, body.fechaInicio, body.fechaFin);
                incubadora = await Incubadora.findIncubadoraAllReport();
                filtro = {
                    incubadora: body.incubadora,
                    fechaInicio: body.fechaInicio,
                    fechaFin: body.fechaFin,
                    reporte: 'incidencia'
                };

                for (let i = 0; i < incidencia.length; i++) {
                    incidencia[i].usuario = usuario
                }

                datos.dataFinal = incidencia;
                datos.dataIncubadora = incubadora;
                datos.filtro = filtro;

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de la incidencia');
            }
        })
    },

    // ==================== Reporte Exportar ==================== //
    listDataExport: (usuario, reqData, DataSensor, TipoSensor, Persona, Pedido, Empresa, Incubacion, Incubadora, Incidencia) => {
        return new Promise(async (resolve, reject) => {
            let dataFinal, filtro;
            let datos = {};

            if (typeof reqData != 'undefined') {
                filtro = reqData;
            }

            try {
                if (filtro.reporte == 'representante') {
                    if (Object.keys(filtro).length > 1) {
                        dataFinal = await Persona.findRepresentanteEmpresaByEstado(filtro.estado);
                    } else {
                        dataFinal = await Persona.findRepresentanteEmpresaAll();
                    }

                    datos.dataFinal = dataFinal;
                }
                if (filtro.reporte == 'pedido') {
                    if (Object.keys(filtro).length > 1) {
                        dataFinal = await Pedido.findPedidoByFiltroReport(filtro.empresa, filtro.estado);
                    } else {
                        dataFinal = await await Pedido.findPedidoAllReport();
                    }
                    let empresa = await Empresa.findEmpresaAll();

                    datos.dataFinal = dataFinal;
                    datos.dataEmpresa = empresa;
                }
                if (filtro.reporte == 'incubacion') {
                    let pedido, empresa, incubadora;

                    if (Object.keys(filtro).length > 1) {
                        dataFinal = await Incubacion.findIncubacionByFiltroReport(filtro.pedido, filtro.empresa, filtro.incubadora);
                    } else {
                        dataFinal = await Incubacion.findIncubacionAllReport();
                    }
                    pedido = await Pedido.findPedidoIdAllReport();
                    empresa = await Empresa.findEmpresaAll();
                    incubadora = await Incubadora.findIncubadoraAllReport();

                    datos.dataFinal = dataFinal;
                    datos.dataPedido = pedido;
                    datos.dataEmpresa = empresa;
                    datos.dataIncubadora = incubadora;
                }
                if (filtro.reporte == 'incidencia') {
                    if (Object.keys(filtro).length > 1) {
                        dataFinal = await Incidencia.findIncidenciaByFiltroReport(filtro.incubadora, filtro.fechaInicio, filtro.fechaFin);
                    } else {
                        dataFinal = await Incidencia.findIncidenciaAllReport();
                    }
                    incubadora = await Incubadora.findIncubadoraAllReport();

                    for (let i = 0; i < dataFinal.length; i++) {
                        dataFinal[i].usuario = usuario
                    }

                    datos.dataFinal = dataFinal;
                    datos.dataIncubadora = incubadora;
                }
                if (filtro.reporte == 'sensores') {
                    if (Object.keys(filtro).length > 1) {
                        dataFinal = await DataSensor.findSensoresByFiltroReport(filtro.tipoSensor, filtro.fechaInicio, filtro.fechaFin);
                    } else {
                        dataFinal = await DataSensor.findSensoresAllReport();
                    }
                    let tipoSensor = await TipoSensor.findtipoSensorAllReport();

                    datos.dataFinal = dataFinal;
                    datos.dataTipoSensor = tipoSensor;
                }

                if (filtro.reporte == 'temperatura_Humedad_por_modulo') {
                    if (Object.keys(filtro).length > 1) {
                        dataFinal = await Incubacion.findTempHumedadByFiltroReport(filtro.incubadora, filtro.fechaInicio, filtro.fechaFin);
                    } else {
                        dataFinal = await Incubacion.findTempHumedadAllReport();
                    }
                    let incubadora = await Incubadora.findIncubadoraAllReport();

                    datos.dataFinal = dataFinal;
                    datos.dataIncubadora = incubadora;
                }

                resolve(datos);

            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos');
            }
        })
    },

    exportDataToExcel: (reqData, Persona, Pedido, Incubacion, Incidencia, DataSensor) => {
        return new Promise(async (resolve, reject) => {
            let filtro;
            let dataFinal;
            // let nombre_archivo = generate();

            if (typeof reqData != 'undefined') {
                filtro = reqData;
            }

            let datas = [];
            let workSheetColumnNames = [];
            const workSheetName = 'Users';
            const filePath = 'reporte_' + filtro.reporte + '.xlsx';
            //const filePath = './reporte_' + reporte + '.xlsx';

            if (filtro.reporte == 'representante') {
                workSheetColumnNames = ["empresa", "nombre", "apellido", "telefono", "email", "direccion rep legal", "direccion empresa"]

                if (Object.keys(filtro).length > 1) {
                    dataFinal = await Persona.findRepresentanteEmpresaByEstado(filtro.estado);
                } else {
                    dataFinal = await Persona.findRepresentanteEmpresaAll();
                }

                datas = dataFinal.map(m => {
                    let representante = [m.nombre_empresa, m.nombres, m.apellidos, m.celular, m.email, m.direccion, m.direccion_empresa]
                    return representante;
                });
            }
            if (filtro.reporte == 'pedido') {
                workSheetColumnNames = ["empresa", "representante legal", "cantidad solicitada", "fecha de pedido", "fecha de entrega", "pedido CODIGO", "estado"]

                if (Object.keys(filtro).length > 1) {
                    dataFinal = await Pedido.findPedidoByFiltroReport(filtro.empresa, filtro.estado);
                } else {
                    dataFinal = await await Pedido.findPedidoAllReport();
                }

                datas = dataFinal.map(m => {
                    let pedido = [m.nombre_empresa, m.nombres + ' ' + m.apellidos, m.cantidad, m.fecha_pedido, m.fecha_entrega, m.id_pedido, m.estado]
                    return pedido;
                });
            }
            if (filtro.reporte == 'incubacion') {
                workSheetColumnNames = ["fecha entrega de pedido", "empresa", "nº de pedido", "incubadora", "cantidad", "piso inicial", "piso final", "fecha inicio", "fecha salida"]

                if (Object.keys(filtro).length > 1) {
                    dataFinal = await Incubacion.findIncubacionByFiltroReport(filtro.pedido, filtro.empresa, filtro.incubadora);
                } else {
                    dataFinal = await Incubacion.findIncubacionAllReport();
                }

                datas = dataFinal.map(m => {
                    let incubacion = [m.fecha_entrega, m.nombre_empresa, m.id_pedido, m.nombre_incubadora, m.cantidad_ingreso, m.piso_inicio, m.piso_fin, m.fecha_ingreso, m.fecha_salida]
                    return incubacion;
                });
            }
            if (filtro.reporte == 'incidencia') {
                workSheetColumnNames = ["incubadora", "cantidad ingreso", "CANT PERDIDA", "INCIDENCIA", "ESTADO", "FECHA REG INCIDENCIA", "USUARIO Q REPORTA"]

                if (Object.keys(filtro).length > 1) {
                    dataFinal = await Incidencia.findIncidenciaByFiltroReport(filtro.incubadora, filtro.fechaInicio, filtro.fechaFin);
                } else {
                    dataFinal = await Incidencia.findIncidenciaAllReport();
                }

                datas = dataFinal.map(m => {
                    let incidencia = [m.nombre_incubadora, m.cantidad_ingreso, m.cantidad_defectuosos, m.descripcion, m.estado, m.fecha_registrada, m.usuario]
                    return incidencia;
                });
            }
            if (filtro.reporte == 'sensores') {
                workSheetColumnNames = ["NOM SENSOR", "TIPO SENSOR", "VALOR", "FECHA", "TIME"]

                if (Object.keys(filtro).length > 1) {
                    dataFinal = await DataSensor.findSensoresByFiltroReport(filtro.tipoSensor, filtro.fechaInicio, filtro.fechaFin);
                } else {
                    dataFinal = await DataSensor.findSensoresAllReport();
                }

                datas = dataFinal.map(m => {
                    let sensores = [m.nombre_sensor, m.tipo_sensor, m.valor, m.fecha, m.hora]
                    return sensores;
                });
            }
            if (filtro.reporte == 'temperatura_Humedad_por_modulo') {
                workSheetColumnNames = ["incubadora", "día", "promedio temperatura sensor", "promedio humedad", "FECHA INICIO X INCUBACION", "FECHA FIN X INCUBACION"]

                if (Object.keys(filtro).length > 1) {
                    dataFinal = await Incubacion.findTempHumedadByFiltroReport(filtro.incubadora, filtro.fechaInicio, filtro.fechaFin);
                } else {
                    dataFinal = await Incubacion.findTempHumedadAllReport();
                }

                datas = dataFinal.map(m => {
                    let tempHumedad = [m.nombre_incubadora, m.dia, m.prom_temperatura, m.prom_humedad, m.fecha_ingreso, m.fecha_salida]
                    return tempHumedad;
                });
            }

            exportExcel(datas, workSheetColumnNames, workSheetName, filePath);
            resolve(filePath);
        })
    }

}