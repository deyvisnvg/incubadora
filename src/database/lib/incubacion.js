'use strict'

const { Sequelize, Op, QueryTypes } = require('sequelize');
// const Op = sequelize.Op;
// const { QueryTypes } = require('sequelize');
const { dateFormatYMD, dateFormatYMD_addPersonalizado } = require('../../dateFormatUtc');

module.exports = (IncubacionModel, PedidoModel, IncubadoraModel, RepresentanteEmpresaModel, RepresentanteModel, PersonaModel, EmpresaModel, sequelize) => {

    /* INICIO: Componentes: incubadora */
    async function addIncubacion(data) {
        return await IncubacionModel.create(data);
    }

    // async function findIncubacionAll() {
    //     return await IncubacionModel.findAll();
    // }

    async function findIncubacionAll() {

        return await IncubacionModel.findAll({
            attributes: ['id_pedido', [Sequelize.fn('count', Sequelize.col('id_incubacion')), 'n_incubacion'], 'estado'],
            where: {
                estado: 'Activo'
            },
            include: [{
                attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'],
                model: PedidoModel,
            }],
            group: ["id_pedido"], // Agrupame por id_persona y que me de la cantidad de pedidos(por identificador del pedido)
            raw: true
        })
    }

    async function findIncubacionByPedidoId(id_pedido) {
        return await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'hora_ingreso', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso', 'id_pedido'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                id_pedido
            },
            include: [{
                attributes: ['id_incubadora', 'nombre_incubadora'],
                model: IncubadoraModel,
            }],
            raw: true, // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }
    /* FIN */

    async function findIncubacionAllOn() {
        return await IncubacionModel.findAll({
            attributes: ['id_incubadora', 'nombre_incubadora'], // Para seleccionar ese atributo específico que quiero retornar
            // group: ['type'], // Lo agrupamos por type
            where: {
                estado: "Activo"
            },
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }

    async function findIncubacionByPedidoIdDataPersona(id_pedido) {
        const incubacion = await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'hora_ingreso', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso'],
            where: {
                estado: 'Activo',
                id_pedido
            },
            include: [
                {
                    attributes: ['id_incubadora', 'nombre_incubadora'],
                    model: IncubadoraModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                },
                {
                    attributes: ['id_pedido'],
                    model: PedidoModel,
                    include: [{
                        attributes: ['id_representante_empresa'],
                        model: RepresentanteEmpresaModel,
                        include: [
                            {
                                attributes: ['id_representante'],
                                model: RepresentanteModel,
                                include: [{
                                    attributes: ['dni_persona', 'nombres', 'apellidos'],
                                    model: PersonaModel,
                                }]
                            }
                        ]
                    }]
                }
            ],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return incubacion;
    }

    function formatoResultado(resultado) {
        let dataFilter = resultado.filter(m => m['pedido.id_pedido'] != null)

        let data = dataFilter.map(m => {
            let datos = {
                fecha_entrega: m['pedido.fecha_entrega'],
                nombre_empresa: m['pedido.representante_empresa.empresa.nombre_empresa'],
                id_pedido: m['pedido.id_pedido'],
                nombre_incubadora: m['incubadora.nombre_incubadora'],
                cantidad_ingreso: m.cantidad_ingreso,
                piso_inicio: m.piso_inicio,
                piso_fin: m.piso_fin,
                fecha_ingreso: m.fecha_ingreso,
                fecha_salida: m.fecha_salida
            }
            return datos;
        })
        return data;
    }

    async function findIncubacionAllReport() {
        const resultado = await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso'],
            include: [
                {
                    attributes: ['id_incubadora', 'nombre_incubadora'],
                    model: IncubadoraModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                },
                {
                    attributes: ['id_pedido', 'fecha_entrega'],
                    model: PedidoModel,
                    include: [{
                        attributes: ['id_representante_empresa'],
                        model: RepresentanteEmpresaModel,
                        include: [
                            {
                                attributes: ['ruc_empresa', 'nombre_empresa'],
                                model: EmpresaModel,
                            }
                        ]
                    }]
                }
            ],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        let data = formatoResultado(resultado);
        return data;
    }

    async function findIncubacionByFiltroReport(id_pedido, id_empresa, id_incubadora) {

        let condicion = {};
        let condicion_emp = {};

        if (id_pedido != "" && id_empresa != "" && id_incubadora != "") {
            condicion = { id_pedido, id_incubadora };
            condicion_emp = { id_empresa };
            // console.log(condicion);
            // console.log(condicion_emp);
        } else if (id_pedido != "" && id_empresa != "") {
            condicion = { id_pedido };
            condicion_emp = { id_empresa };

        } else if (id_empresa != "" && id_incubadora != "") {
            condicion = { id_incubadora };
            condicion_emp = { id_empresa };

        } else if (id_pedido != "" && id_incubadora != "") {
            condicion = { id_pedido, id_incubadora };
            condicion_emp = {
                id_empresa: {
                    [Op.not]: null,
                }
            };
        } else if (id_pedido != "") {
            condicion = { id_pedido };
            condicion_emp = {
                id_empresa: {
                    [Op.not]: null,
                }
            };
        } else if (id_empresa != "") {
            condicion = {
                id_pedido: {
                    [Op.not]: null,
                }
            };
            condicion_emp = { id_empresa };
        } else if (id_incubadora != "") {
            condicion = { id_incubadora };
            condicion_emp = {
                id_empresa: {
                    [Op.not]: null,
                }
            };
        } else {
            condicion = {
                id_pedido: {
                    [Op.not]: null,
                }
            };
            condicion_emp = {
                id_empresa: {
                    [Op.not]: null,
                }
            };
        }

        const resultado = await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso'],
            where: condicion,
            include: [
                {
                    attributes: ['id_incubadora', 'nombre_incubadora'],
                    model: IncubadoraModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
                },
                {
                    attributes: ['id_pedido', 'fecha_entrega'],
                    model: PedidoModel,
                    include: [{
                        attributes: ['id_representante_empresa'],
                        model: RepresentanteEmpresaModel,
                        where: condicion_emp,
                        include: [
                            {
                                attributes: ['ruc_empresa', 'nombre_empresa'],
                                model: EmpresaModel,
                            }
                        ]
                    }]
                }
            ],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        let data = formatoResultado(resultado);
        return data;
    }

    // async function findIncubacionDataPersona() {
    //     const incubacion = await PedidoModel.findAll({
    //         attributes: ['id_pedido'],
    //         where: {
    //             estado: 'Activo'
    //         },
    //         include: [
    //             {
    //                 attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'hora_ingreso', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso', 'id_pedido'],
    //                 model: IncubacionModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
    //                 where: {
    //                     estado: 'Activo'
    //                 },
    //                 raw: true
    //             }
    //         ],
    //         // include: [],
    //         // raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    //     });

    //     // let data = incubacion.map(m => {
    //     //     function data() {
    //     //         let incub = {};
    //     //         let incuba = {};

    //     //         m.incubacions.forEach(element => {
    //     //             incub.data = element;
    //     //         });

    //     //         incub.data.forEach(element => {
    //     //             incuba.data = element;
    //     //         });

    //     //         return incuba;
    //     //     }

    //     //     let coordenadas = {
    //     //         id_pedido: m.id_pedido,
    //     //         incubacion: data()
    //     //     }
    //     //     return coordenadas
    //     // })

    //     // console.log(data);

    //     // return incubacion;
    //     // const incubacion = await IncubacionModel.findAll({
    //     //     attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'hora_ingreso', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso'],
    //     //     where: {
    //     //         estado: 'Activo'
    //     //     },
    //     //     include: [
    //     //         {
    //     //             attributes: ['id_incubadora', 'nombre_incubadora'],
    //     //             model: IncubadoraModel, // La tabla o modelo con quien voya a relacionarlo o hacer el join
    //     //         },
    //     //         {
    //     //             attributes: ['id_pedido'],
    //     //             model: PedidoModel,
    //     //             include: [{
    //     //                 attributes: ['nombres', 'apellidos'],
    //     //                 model: PersonaModel,
    //     //             }]
    //     //         }
    //     //     ],
    //     //     raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
    //     // });

    //     // return incubacion;
    // }

    // ------------------------------------------------------------------------------

    function formatoResultadoTwo(resultado) {
        return new Promise(async (resolve, reject) => {
            let resultadoFinal = [];

            let data = resultado.map(m => {
                const count = 22;

                let datos = {
                    id_incubacion: m.id_incubacion,
                    fecha_ingreso: m.fecha_ingreso,
                    fecha_salida: m.fecha_salida,
                    nombre_incubadora: m['incubadora.nombre_incubadora'],
                }

                let fecha_actual = new Date(dateFormatYMD()).getTime();
                let fecha_ingreso = new Date(m.fecha_ingreso).getTime();
                let dias_contados = (fecha_actual - fecha_ingreso) / (1000 * 60 * 60 * 24);

                let fecha_salida = new Date(m.fecha_salida).getTime();

                if (fecha_actual >= fecha_salida) {
                    datos.fecha_alternativa = m.fecha_salida;
                    datos.dias_contados = count;
                } else {
                    datos.fecha_alternativa = dateFormatYMD_addPersonalizado(m.fecha_ingreso, dias_contados);
                    datos.dias_contados = dias_contados;
                }

                return datos;
            })

            // console.log(data);

            for (const m of data) {
                let promedios = await sequelize.query(`SELECT SUM(CASE WHEN T.tipo_sensor = 'HUMEDAD' THEN D.valor END) / COUNT(CASE WHEN T.tipo_sensor = 'HUMEDAD' THEN D.valor END) AS prom_humedad, 
                                                    SUM(CASE WHEN T.tipo_sensor = 'TEMPERATURA' THEN D.valor END) / COUNT(CASE WHEN T.tipo_sensor = 'TEMPERATURA' THEN D.valor END) AS prom_temperatura, D.fecha 
                                                    FROM data_sensor D JOIN sensores S ON D.id_sensor = S.id_sensor 
                                                    JOIN incubadora I ON S.id_incubadora = I.id_incubadora 
                                                    JOIN tipo_sensor T ON S.id_tipoSensor = T.id_tipoSensor 
                                                    WHERE I.nombre_incubadora = '${m.nombre_incubadora}' 
                                                    AND D.fecha BETWEEN '${m.fecha_ingreso}' AND '${m.fecha_alternativa}' 
                                                    GROUP BY D.fecha`, { type: QueryTypes.SELECT });

                if (promedios.length > 0) {
                    for (const p of promedios) {
                        var datos = {
                            id_incubacion: m.id_incubacion,
                            fecha_ingreso: m.fecha_ingreso,
                            fecha_salida: m.fecha_salida,
                            nombre_incubadora: m.nombre_incubadora,
                            prom_humedad: p.prom_humedad,
                            prom_temperatura: p.prom_temperatura,
                            dia: p.fecha
                        }
                        resultadoFinal.push(datos);
                    }
                }
            }

            resolve(resultadoFinal);
        })
    }

    async function findTempHumedadAllReport() {
        const resultado = await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida'],
            include: [{
                attributes: ['nombre_incubadora'],
                model: IncubadoraModel,
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return formatoResultadoTwo(resultado)

    }

    async function findTempHumedadByFiltroReport(id_incubadora, fechaInicio, fechaFin) {
        let condicion = {};
        let condicion_to = {};

        if (id_incubadora != "" && fechaInicio != "" && fechaFin != "") {
            condicion = {
                [Op.and]: [
                    {
                        fecha_ingreso: {
                            [Op.gte]: fechaInicio,
                        }
                    },
                    {
                        fecha_salida: {
                            [Op.lte]: fechaFin,
                        }
                    }
                ]
            };
            condicion_to = { id_incubadora };
            // console.log(condicion);
            // console.log(condicion_to);
        } else if (id_incubadora != "" && fechaInicio != "") {
            condicion = {
                [Op.and]: [
                    {
                        fecha_ingreso: {
                            [Op.gte]: fechaInicio,
                        }
                    },
                    {
                        fecha_salida: {
                            [Op.lte]: fechaFin,
                        }
                    }
                ]
            };
            condicion_to = { id_incubadora };
        } else if (fechaInicio != "" && fechaFin != "") {
            condicion = {
                [Op.and]: [
                    {
                        fecha_ingreso: {
                            [Op.gte]: fechaInicio,
                        }
                    },
                    {
                        fecha_salida: {
                            [Op.lte]: fechaFin,
                        }
                    }
                ]
            };
            condicion_to = {
                id_incubadora: {
                    [Op.not]: null,
                }
            };
        } else if (id_incubadora != "") {
            condicion = {
                id_incubacion: {
                    [Op.not]: null,
                }
            };
            condicion_to = { id_incubadora };
        } else {
            condicion = {
                id_incubacion: {
                    [Op.not]: null,
                }
            };
            condicion_to = {
                id_incubadora: {
                    [Op.not]: null,
                }
            };
        }

        const resultado = await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida'],
            where: condicion,
            include: [{
                attributes: ['nombre_incubadora'],
                model: IncubadoraModel,
                where: condicion_to,
            }],
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });

        return formatoResultadoTwo(resultado)
    }

    async function findIncubacionById(id_incubacion) {
        const result = await IncubacionModel.findOne({
            where: {
                id_incubacion
            },
            include: [{
                attributes: ['id_incubadora', 'nombre_incubadora'],
                model: IncubadoraModel,
            }],
        })
        return result.toJSON();
    }

    async function updateIncubacionById(id_incubacion, incubacion) {
        const cond = {
            where: {
                id_incubacion
            }
        }

        return await IncubacionModel.update(incubacion, cond)
    }


    return {
        addIncubacion,
        findIncubacionAll,
        findIncubacionByPedidoId,
        findIncubacionAllOn,
        findIncubacionByPedidoIdDataPersona,
        findIncubacionAllReport,
        findIncubacionByFiltroReport,
        findTempHumedadAllReport,
        findTempHumedadByFiltroReport,
        findIncubacionById,
        updateIncubacionById
    }
}