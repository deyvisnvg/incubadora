const { handleError } = require('../../error');

module.exports = {

    listCamara: Camara => {
        return new Promise(async (resolve, reject) => {
            const camara = await Camara.findCamaraAll().catch(err => handleError(err));

            let data = camara.map(m => {
                let dataCamara = {
                    id_camara: m.id_camara,
                    ip_camara: m.ip_camara,
                    nombre_incubadora: m['incubadora.nombre_incubadora'],
                    estado: m.estado
                }
                return dataCamara
            })

            resolve(data);
        })
    },

    dataAddCamara: (Incubadora) => {
        return new Promise(async (resolve, reject) => {
            const incubadora = await Incubadora.findIncubadoraAllOn().catch(err => handleError(err));
            resolve(incubadora);

        })
    },

    addCamara: (body, Camara) => {
        return new Promise(async (resolve, reject) => {
            const camara = {
                ip_camara: body.ip_camara,
                estado: body.estado,
                id_incubadora: body.incubadora,
            }

            await Camara.addCamara(camara).catch(err => handleError(err));
            resolve();

        })
    },

    editCamara: function (id_camara, Camara, Incubadora) {
        return new Promise(async (resolve, reject) => {

            if (!id_camara) {
                reject("La id no se recibió");
                return false;
            }

            try {
                const camara = await Camara.findCamaraById(id_camara);
                const incubadora = await Incubadora.findIncubadoraAllOn().catch(err => handleError(err));
                camara.incubadoras = incubadora;

                resolve(camara);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateCamara: function (id_camara, body, Camara) {
        return new Promise(async (resolve, reject) => {
            const camara = {
                ip_camara: body.ip_camara,
                estado: body.estado,
                id_incubadora: body.incubadora,
            }

            try {
                await Camara.updateCamaraById(id_camara, camara);
                resolve();
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

}