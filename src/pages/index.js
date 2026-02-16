import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FileImage } from 'lucide-react';

export default function Home() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                    Convertidor Web <span className="text-blue-600">Gratuito</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                    Herramientas sencillas, rápidas y seguras para convertir tus archivos directamente en el navegador.
                </p>

                <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
                    <Link href="/img-to-pdf" className="group w-full max-w-sm">
                        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col items-center h-full">
                            <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                                <FileImage className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Imagen a PDF</h2>
                            <p className="text-gray-500 text-sm">Convierte JPG y PNG a PDF sin perder calidad.</p>
                        </div>
                    </Link>
                    {/* Aquí puedes añadir más herramientas en el futuro */}
                </div>
            </div>
        </Layout>
    );
}
