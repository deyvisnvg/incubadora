'use strict'

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (PedidoModel, RepresentanteEmpresaModel, EmpresaModel, RepresentanteModel, PersonaModel) => {

    async function addPedido(data) {
        return await PedidoModel.create(data);
    }

    // async function findPedidoAll() {

    //     const pedidoGroup = await PedidoModel.findAll({
    //         attributes: ['id_representante_empresa', [sequelize.fn('count', sequelize.col('id_pedido')), 'n_pedidos']],
    //         where: {
    //             estado: 'Activo'
    //         },
    //         include: [{
    //             attributes: ['id_representante_empresa', 'id_representante', 'id_empresa', 'estado'],
    //             model: RepresentanteEmpresaModel,
    //             required: true,
    //             include: [{
    //                 attributes: ['ruc_empresa', 'nombre_empresa'],
    //                 model: EmpresaModel
    //             }]
    //         }],
    //         group: ["id_representante_empresa"], // Agrupame por id_persona y que me de la cantidad de pedidos(por identificador del pedido)
    //         //raw: true
    //     })

    //     console.log(JSON.stringify(pedidoGroup, null, 2));
    // }

    async function findPedidoAll() {
        const pedidoGroup = await PedidoModel.findAll({
            attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'],
            order: [['fecha_pedido', 'DESC']],
            include: [{
                attributes: ['id_representante_empresa', 'id_representante', 'id_empresa'],
                model: RepresentanteEmpresaModel,
                required: true,
                include: [
                    {
                        attributes: ['nombre_empresa'],
                        model: EmpresaModel
                    },
                    {
                        attributes: ['id_representante'],
                        model: RepresentanteModel,
                        include: [{
                            attributes: ['dni_persona', 'nombres', 'apellidos'],
                            model: PersonaModel
                        }]
                    }
                ]
            }],
            raw: true
        })
        return pedidoGroup;

        //console.log(JSON.stringify(pedidoGroup, null, 2));

        // const personas = await PersonaModel.findAll();

        // for (const i in pedidoGroup) {
        //     for (const j in personas) {
        //         if (pedidoGroup[i]['representante.id_persona'] == personas[j].dni_persona) {
        //             pedidoGroup[i].dni_persona = personas[j].dni_persona;
        //             pedidoGroup[i].nombres = personas[j].nombres;
        //             pedidoGroup[i].apellidos = personas[j].apellidos;
        //         }
        //     }
        // }
        // .then((result) => {
        //     console.log("hola" + result)
        // })

        // console.log(pedidoGroup);
        // return pedidoGroup;
    }

    function formatoResultado(resultado) {
        let data = resultado.map(m => {
            let datos = {
                id_pedido: m.id_pedido,
                cantidad: m.cantidad,
                fecha_pedido: m.fecha_pedido,
                fecha_entrega: m.fecha_entrega,
                estado: m.estado,
                nombre_empresa: m['representante_empresa.empresa.nombre_empresa'],
                nombres: m['representante_empresa.representante.persona.nombres'],
                apellidos: m['representante_empresa.representante.persona.apellidos']
            }
            return datos;
        })

        return data;
    }

    /* #Usado en el Componente: reporte */
    async function findPedidoAllReport() {
        const resultado = await PedidoModel.findAll({
            attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'],
            order: [['fecha_pedido', 'DESC']],
            include: [{
                attributes: ['id_representante_empresa', 'id_representante', 'id_empresa'],
                model: RepresentanteEmpresaModel,
                required: true,
                include: [
                    {
                        attributes: ['nombre_empresa'],
                        model: EmpresaModel
                    },
                    {
                        attributes: ['id_representante'],
                        model: RepresentanteModel,
                        include: [{
                            attributes: ['dni_persona', 'nombres', 'apellidos'],
                            model: PersonaModel
                        }]
                    }
                ]
            }],
            raw: true
        })

        let data = formatoResultado(resultado);
        return data;
    }

    /* #Usado en el Componente: reporte */
    async function findPedidoByFiltroReport(id_empresa, estado) {
        let condicion = {};
        let condicion_emp = {};

        if (id_empresa != "" && estado != "") {
            condicion = { estado };
            condicion_emp = { id_empresa };
            // console.log(condicion);
            // console.log(condicion_emp);
        } else if (id_empresa != "") {
            condicion = {
                estado: {
                    [Op.not]: null,
                }
            };
            condicion_emp = { id_empresa };
        } else if (estado != "") {
            condicion = { estado };
            condicion_emp = {
                id_empresa: {
                    [Op.not]: null,
                }
            };
        } else {
            condicion = {
                estado: {
                    [Op.not]: null,
                }
            };
            condicion_emp = {
                id_empresa: {
                    [Op.not]: null,
                }
            };
        }
        const resultado = await PedidoModel.findAll({
            attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'],
            order: [['fecha_pedido', 'DESC']],
            where: condicion,
            include: [{
                attributes: ['id_representante_empresa', 'id_representante', 'id_empresa'],
                model: RepresentanteEmpresaModel,
                where: condicion_emp,
                required: true,
                include: [
                    {
                        attributes: ['nombre_empresa'],
                        model: EmpresaModel
                    },
                    {
                        attributes: ['id_representante'],
                        model: RepresentanteModel,
                        include: [{
                            attributes: ['dni_persona', 'nombres', 'apellidos'],
                            model: PersonaModel
                        }]
                    }
                ]
            }],
            raw: true
        })

        let data = formatoResultado(resultado);
        return data;
    }

    /* #Usado en el Componente: incubadora, monitoreo */
    async function findPedidoAllOn() {
        return await PedidoModel.findAll({
            attributes: ['id_pedido'],
            where: {
                estado: 'Activo'
            },
            raw: true
        });
    }

    /* #Usado en el Componente: reporte */
    async function findPedidoIdAllReport() {
        return await PedidoModel.findAll({
            attributes: ['id_pedido'],
            raw: true
        });
    }

    /* #Usado en el Componente: monitoreo */
    async function findPedidoByPersonaIdAll(id_representante_empresa) {
        return await PedidoModel.findAll({
            attributes: ['id_pedido', 'estado', 'id_representante_empresa', 'fecha_pedido'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                id_representante_empresa
            },
            raw: true
        });
    }

    /* #Usado en el Componente: incubadora */
    async function findPedidoByIdAll(id_pedido) {
        return await PedidoModel.findAll({
            attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                id_pedido
            },
            raw: true
        });
    }

    /* #Usado en el Componente: pedido */
    async function findPedidoById(id_pedido) {
        const result = await PedidoModel.findOne({
            where: {
                id_pedido
            }
        })
        return result.toJSON();
    }

    /* #Usado en el Componente: pedido */
    async function updatePedidoById(id_pedido, pedido) {
        const cond = {
            where: {
                id_pedido
            }
        }

        return await PedidoModel.update(pedido, cond)
    }


    return {
        addPedido,
        findPedidoAll,
        findPedidoAllReport,
        findPedidoAllOn,
        findPedidoIdAllReport,
        findPedidoByPersonaIdAll,
        findPedidoByIdAll,
        findPedidoById,
        updatePedidoById,
        findPedidoByFiltroReport
    }
}