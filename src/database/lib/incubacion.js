'use strict'

const sequelize = require('sequelize');

module.exports = (IncubacionModel, PedidoModel, IncubadoraModel, RepresentanteEmpresaModel, RepresentanteModel, PersonaModel, EmpresaModel) => {

    /* INICIO: Componentes: incubadora */
    async function addIncubacion(data) {
        return await IncubacionModel.create(data);
    }

    // async function findIncubacionAll() {
    //     return await IncubacionModel.findAll();
    // }

    async function findIncubacionAll() {

        return await IncubacionModel.findAll({
            attributes: ['id_pedido', [sequelize.fn('count', sequelize.col('id_incubacion')), 'n_incubacion'], 'estado'],
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
        // findIncubacionDataPersona,
        findIncubacionById,
        updateIncubacionById
    }
}