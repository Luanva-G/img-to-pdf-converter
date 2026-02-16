import { jsPDF } from "jspdf"

/**
 * Convierte un objeto de archivo de imagen (File) a un documento PDF con su tamaño exacto.
 * @param {File} image - El archivo de imagen subido por el usuario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando la descarga termina.
 */
export const convertImageToPdf = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imgData = e.target.result;
            const img = new Image();
            img.src = imgData;

            img.onload = () => {
                try {
                    // 1. DINÁMICO: Tamaño exacto de la imagen (Sin bordes blancos)
                    const orientation = img.width > img.height ? 'l' : 'p';
                    const pdf = new jsPDF(orientation, 'px', [img.width, img.height]);

                    // Agregamos la imagen ocupando el 100% del lienzo que acabamos de crear
                    pdf.addImage(imgData, "JPEG", 0, 0, img.width, img.height);

                    // 2. DINÁMICO: Nombre del archivo original
                    // Extraemos el nombre original sin la extensión (.jpg, .png)
                    const originalName = image.name.split('.')[0];
                    const finalFilename = `${originalName}-convertido.pdf`;

                    // Descargamos el archivo con su nuevo nombre
                    pdf.save(finalFilename);

                    // Le avisamos a React que todo salió bien
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = (error) => {
                reject(new Error("Error al cargar la imagen para procesamiento: " + error));
            };
        };

        reader.onerror = (error) => {
            reject(new Error("Error al leer el archivo: " + error));
        };

        reader.readAsDataURL(image);
    });
};