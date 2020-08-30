'use strict'

const sequelize = require('sequelize');

module.exports = (PedidoModel, PersonaModel, UsuarioModel) => {

    async function addPedido(data) {
        return await PedidoModel.create(data);
    }

    async function findPedidoAll() {

        return await PedidoModel.findAll({
            attributes: ['id_persona', [sequelize.fn('count', sequelize.col('id_pedido')), 'n_pedidos']],
            include: [{
                attributes: ['dni_persona', 'nombres', 'apellidos'],
                model: PersonaModel,
            }],
            group: ["id_persona"], // Agrupame por id_persona y que me de la cantidad de pedidos(por identificador del pedido)
            raw: true
        })
        // .then((result) => {
        //     console.log("hola" + result)
        // })
    }

    async function findPedidoAllOn() {
        return await PedidoModel.findAll({
            attributes: ['id_pedido'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                estado: 'Activo'
            },
            // group: ['type'], // Lo agrupamos por type
            raw: true, // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }

    async function findPedidoByPersonaId(id_persona) {
        return await PedidoModel.findAll({
            attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                id_persona
            },
            // group: ['type'], // Lo agrupamos por type
            raw: true, // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }

    async function findByPedidoId(id_pedido) {
        return await PedidoModel.findAll({
            attributes: ['id_pedido', 'cantidad', 'comentario', 'fecha_pedido', 'hora_pedido', 'fecha_entrega', 'estado'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                id_pedido
            },
            // group: ['type'], // Lo agrupamos por type
            raw: true, // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }


    return {
        addPedido,
        findPedidoAll,
        findPedidoAllOn,
        findPedidoByPersonaId,
        findByPedidoId
    }
}