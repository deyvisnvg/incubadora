const { dateFormatYMD } = require('../../dateFormatUtc');
const { handleError } = require('../../error');

module.exports = {
    listEmpresa: Empresa => {
        return new Promise(async (resolve, reject) => {

            let dataEmpresa;

            try {
                dataEmpresa = await Empresa.findEmpresaAll();
                resolve(dataEmpresa);
            } catch (error) {
                reject('[Error!]: No se pudo obtener los datos de la Empresa');
            }

        })
    },

    addEmpresa: function (body, Empresa) {
        return new Promise(async (resolve, reject) => {

            const dataEmpresa = {
                ruc_empresa: body.ruc_empresa,
                nombre_empresa: body.nombre_empresa,
                direccion: body.direccion,
                email: body.email,
                celular: body.celular,
                telefono: body.telefono,
                fecha_registro: dateFormatYMD()
            }

            await Empresa.addEmpresa(dataEmpresa).catch(handleError);
            resolve();
        })
    },

    editEmpresa: function (ruc_empresa, Empresa) {
        return new Promise(async (resolve, reject) => {

            if (!ruc_empresa) {
                reject("La id no se recibió");
                return false;
            }

            try {
                const empresa = await Empresa.findEmpresaId(ruc_empresa);

                resolve(empresa);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateEmpresa: function (ruc_empresa, body, Empresa) {
        return new Promise(async (resolve, reject) => {
            const dataEmpresa = {
                nombre_empresa: body.nombre_empresa,
                direccion: body.direccion,
                email: body.email,
                celular: body.celular,
                telefono: body.telefono
            }

            try {
                await Empresa.updateEmpresaId(ruc_empresa, dataEmpresa);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    }
    
}