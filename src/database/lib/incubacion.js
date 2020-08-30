'use strict'

const sequelize = require('sequelize');

module.exports = (IncubacionModel, PedidoModel, IncubadoraModel) => {

    async function addIncubacion(data) {
        return await IncubacionModel.create(data);
    }

    // async function findIncubacionAll() {
    //     return await IncubacionModel.findAll();
    // }

    async function findIncubacionAll() {

        return await IncubacionModel.findAll({
            attributes: ['id_pedido', [sequelize.fn('count', sequelize.col('id_incubacion')), 'n_incubacion']],
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

    async function findIncubacionByIncubadoraName() {
        return await IncubacionModel.findAll({
            attributes: ['id_incubacion', 'fecha_ingreso', 'fecha_salida', 'hora_ingreso', 'estado', 'piso_inicio', 'piso_fin', 'cantidad_ingreso', 'id_pedido'], // Para seleccionar ese atributo específico que quiero retornar
            where: {
                estado: 'Activo'
            },
            include: [{
                attributes: ['id_incubadora', 'nombre_incubadora'],
                model: IncubadoraModel,
                where: {
                    nombre_incubadora: 'Modulo 1'
                }
            }],
            raw: true, // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }


    return {
        addIncubacion,
        findIncubacionAll,
        findIncubacionByPedidoId,
        findIncubacionAllOn,
        findIncubacionByIncubadoraName
    }
}