'use strict'

module.exports = EmpresaModel => {

    async function addEmpresa(data) {
        return await EmpresaModel.create(data);
    }

    async function findEmpresaAll() {
        return await EmpresaModel.findAll({
            attributes: ['id_empresa', 'ruc_empresa', 'nombre_empresa', 'email', 'celular', 'telefono'], // Para seleccionar ese atributo específico que quiero retornar
            // group: ['type'], // Lo agrupamos por type
            raw: true // Que los query sean de tipo row es decir que me devuelvan objetos simples, la información en JSON()
        });
    }


    return {
        addEmpresa,
        findEmpresaAll
    }
}