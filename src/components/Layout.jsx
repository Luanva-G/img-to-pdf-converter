import React from 'react';
import Head from 'next/head'; // Añadido para el SEO
import Link from 'next/link'; // Añadido para navegación súper rápida
import { ArrowRightLeft } from 'lucide-react';

const Layout = ({ children, title = "Convertidor Web | Herramientas Gratis", description = "Herramientas gratuitas para convertir archivos online. Rápido, seguro y procesado en tu navegador." }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* ==========================================
                SEO: Etiquetas para Google
               ========================================== */}
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* ==========================================
                HEADER (Barra de Navegación)
               ========================================== */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <ArrowRightLeft className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-800 tracking-tight">
                            ImgTo<span className="text-blue-600">PDF</span>
                        </span>
                    </div>

                    <nav>
                        <ul className="flex space-x-6 text-sm font-medium text-gray-500">
                            <li>
                                {/* Cambiamos <a> por <Link> */}
                                <Link href="/" className="hover:text-blue-600 transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/img-to-pdf" className="hover:text-blue-600 transition-colors">
                                    Imagen a PDF
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* ==========================================
                MAIN CONTENT (Contenido Principal)
               ========================================== */}
            <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* ==========================================
                FOOTER (Pie de Página)
               ========================================== */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} ImgToPDF Converter. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <span className="text-xs text-gray-400">Privacidad y Términos</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;