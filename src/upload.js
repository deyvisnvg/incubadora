const multer = require('multer');
const path = require('path');
const { config } = require('./config');

const storage = multer.diskStorage({ //Llamamos al método 'diskStorage' para definirle como establecer las imágenes
    destination: path.join(__dirname, 'public' + config.filesRoute),
    filename: (req, file, cb) => { // llamamos a la propiedad 'filename' que es una function, para decirle como voya a colocar el nombre de todas las imagenes que suba
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    dest: path.join(__dirname, 'public' + config.filesRoute),
    fileSize: 5000000, //tamaño de archivo 5MB
    fileFilter(req, file, next) { //Para validar que sólo se puedan cargar imágenes
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: "El tipo de archivo no es válido" }, false);
        }
    }
}).any()
// single('image')

module.exports = upload;