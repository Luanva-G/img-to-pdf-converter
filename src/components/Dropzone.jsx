import React, { useState, useRef, useEffect } from 'react';
import { convertImageToPdf } from '../lib/Converter';
import { Upload, File, X, FileCheck, Loader2 } from 'lucide-react';

const Dropzone = () => {
    // ==========================================
    // ESTADOS DEL COMPONENTE
    // ==========================================
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // isConverting: Estado clave para la Experiencia de Usuario (UX).
    // Nos dice si la aplicación está ocupada procesando el PDF.
    // Lo usamos para mostrar el "spinner" y bloquear botones para que el usuario no rompa nada.
    const [isConverting, setIsConverting] = useState(false);

    const inputRef = useRef(null);

    // ==========================================
    // MANEJADORES DE EVENTOS
    // ==========================================
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (uploadedFile) => {
        if (!uploadedFile.type.startsWith('image/')) {
            alert('Por favor sube solo archivos de imagen.');
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (uploadedFile.size > maxSize) {
            alert('El archivo es demasiado grande. Por favor, sube una imagen de máximo 10MB.');
            return;
        }

        setFile(uploadedFile);
        const objectUrl = URL.createObjectURL(uploadedFile);
        setPreview(objectUrl);
    };

    // ==========================================
    // EFECTOS SECUNDARIOS
    // ==========================================
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    // ==========================================
    // ACCIONES DE BOTONES
    // ==========================================
    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    /**
     * Procesa la conversión de la imagen al PDF usando promesas (async/await).
     * Incluye manejo de errores y estados de carga.
     */
    const handleConvert = async () => {
        if (file) {
            // 1. Antes de empezar, encendemos la señal de "Trabajando..."
            setIsConverting(true);

            try {
                // 2. Intentamos hacer la conversión y ESPERAMOS (await) a que termine.
                await convertImageToPdf(file);
            } catch (error) {
                // 3. Si algo sale mal (ej. falta de memoria), lo atrapamos aquí sin crashear la app.
                console.error("Error al convertir la imagen:", error);
                alert("Hubo un error al convertir la imagen. Por favor intenta de nuevo.");
            } finally {
                // 4. El bloque 'finally' es magia: se ejecuta SIEMPRE al final.
                // Ya sea que hubo éxito o error, apagamos la señal de "Trabajando..."
                setIsConverting(false);
            }
        }
    };

    // ==========================================
    // RENDERIZADO (Interfaz de Usuario)
    // ==========================================
    return (
        <div className="w-full max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Convertidor de Imagen a PDF</h1>

            {!file ? (
                // ZONA DE CARGA DE ARCHIVO
                <form
                    className={`relative w-full h-64 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-colors cursor-pointer
                        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <Upload className={`w-12 h-12 mb-4 ${dragActive ? "text-blue-500" : "text-gray-400"}`} />
                    <p className="text-lg text-gray-600 font-medium">Arrastra y suelta tu imagen aquí</p>
                    <p className="text-sm text-gray-400 mt-2">o haz clic para seleccionar</p>
                </form>
            ) : (
                // ZONA DE VISTA PREVIA Y CONVERSIÓN
                <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">

                    {/* Header del archivo con botón de cerrar */}
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <FileCheck className="w-6 h-6 text-green-500" />
                            <span className="font-medium text-gray-700 truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                            onClick={handleRemove}
                            // Si isConverting es true, desactivamos este botón para evitar errores
                            disabled={isConverting}
                            className={`p-1 transition-colors ${isConverting ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-red-500"}`}
                            title="Eliminar archivo"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col items-center">
                        {/* Miniatura de la imagen (Se hace semitransparente si está cargando) */}
                        {preview && (
                            <div className="mb-6 relative group">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className={`max-h-64 object-contain rounded-md shadow-sm border border-gray-200 transition-opacity ${isConverting ? "opacity-50" : "opacity-100"}`}
                                />
                            </div>
                        )}

                        {/* Botones de acción */}
                        <div className="flex space-x-4 w-full justify-center">
                            {/* Botón Cancelar */}
                            <button
                                onClick={handleRemove}
                                // Se bloquea visualmente y funcionalmente durante la conversión
                                disabled={isConverting}
                                className={`px-6 py-2 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors
                                    ${isConverting ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                            >
                                Cancelar
                            </button>

                            {/* Botón Principal de Conversión */}
                            <button
                                onClick={handleConvert}
                                // Se bloquea para evitar doble clic accidental
                                disabled={isConverting}
                                className={`px-6 py-2 rounded-md font-medium shadow-sm flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
                                    ${isConverting ? "bg-blue-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                            >
                                {isConverting ? (
                                    // Estado ACTIVO: Mostramos el icono de carga girando (animate-spin)
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Convirtiendo...</span>
                                    </>
                                ) : (
                                    // Estado REPOSO: Mostramos el icono normal de archivo
                                    <>
                                        <File className="w-4 h-4" />
                                        <span>Convertir a PDF</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropzone;