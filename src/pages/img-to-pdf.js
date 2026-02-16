import React from 'react';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import { FileImage } from 'lucide-react';

const ImgToPdf = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
                        <FileImage className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-2">
                        De Imagen a PDF
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Transforma tus imágenes (JPG, PNG) en documentos PDF de alta calidad en segundos. Sin marcas de agua y totalmente gratis.
                    </p>
                </div>

                <div className="w-full max-w-2xl">
                    <Dropzone />
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 text-left max-w-4xl w-full">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Rápido y Fácil</h3>
                        <p className="text-gray-600 text-sm">Arrastra tu imagen, haz clic en convertir y descarga tu PDF al instante.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Privacidad Total</h3>
                        <p className="text-gray-600 text-sm">Tu archivo se procesa en tu navegador. Nunca subimos tus imágenes a ningún servidor.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Calidad Original</h3>
                        <p className="text-gray-600 text-sm">Mantenemos la resolución y dimensiones originales de tu imagen sin recortes.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ImgToPdf;
