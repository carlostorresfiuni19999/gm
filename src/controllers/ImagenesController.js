const multer = require('multer');
const path = require('path');

// Configuración de Multer para la carga de imágenes
const upload = multer({
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB límite de tamaño para la imagen
    },
    fileFilter: (req, file, cb) => {
      // Validamos que la extensión sea jpg o png
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExt = path.extname(file.originalname).toLowerCase();
      if (allowedExtensions.includes(fileExt)) {
        cb(null, true);
      } else {
        cb(new Error('Formato de imagen no válido. Solo se permiten archivos jpg o png.'));
      }
    },
  });

  module.exports = upload;