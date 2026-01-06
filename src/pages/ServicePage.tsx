import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceBySlug, getLocalizedContent } from '../services/api';
import type { Service } from '../services/api';
import ServiceCard from '../components/ServiceCard';

interface ServicePageProps {
    activeLang: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ activeLang }) => {
    const { serviceSlug, subServiceSlug } = useParams<{ serviceSlug: string; subServiceSlug?: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!serviceSlug) return;
            setLoading(true);
            const data = await fetchServiceBySlug(serviceSlug);
            setService(data);
            setLoading(false);
        };
        load();
    }, [serviceSlug]);

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="text-white font-black italic text-4xl animate-pulse uppercase tracking-tighter">Cargando...</div>
        </div>
    );

    if (!service) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="text-white font-black italic text-4xl uppercase tracking-tighter">Servicio no encontrado</div>
        </div>
    );

    const content = getLocalizedContent(service, activeLang);

    // If subServiceSlug is present, we could render a sub-page detail here if we had the design.
    // For now, based on user request, we focus on the parent service page style.
    if (subServiceSlug) {
        const subService = service.sub_services?.find(s => s.slug === subServiceSlug);
        if (!subService) return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-white font-black italic text-4xl uppercase tracking-tighter">Sub-servicio no encontrado</div>
            </div>
        );

        const subContent = getLocalizedContent(subService, activeLang);
        return (
            <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 lg:p-32">
                <Link to={`/services/${serviceSlug}`} className="mb-24 inline-block text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 hover:text-blue-500 transition-colors border-b border-gray-800 pb-2">
                    [ Volver a {content.title} ]
                </Link>
                <div className="max-w-[1440px] mx-auto">
                    <header className="mb-28">
                        <h1 className="text-6xl md:text-[120px] font-black tracking-tighter italic uppercase leading-none opacity-90">
                            {subContent.title}
                        </h1>
                    </header>
                    <div className="prose prose-invert prose-2xl font-inter text-white/70 max-w-4xl">
                        {subContent.description || subContent.summary}
                    </div>
                </div>
            </div>
        );
    }

    // Otherwise, Parent Page
    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 lg:p-32">
            <Link to="/" className="mb-24 inline-block text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 hover:text-blue-500 transition-colors border-b border-gray-800 pb-2">
                [ {activeLang === 'ES' ? 'Regresar a Home' : activeLang === 'EN' ? 'Back to Home' : 'Retour à l\'Accueil'} ]
            </Link>

            <div className="max-w-[1440px] mx-auto">
                <header className="mb-28">
                    <h1 className="text-8xl md:text-[150px] font-black tracking-tighter italic uppercase leading-none opacity-90">
                        {content.title}
                    </h1>
                </header>

                {/* Grille de sous-services sur 12 colonnes */}
                {service.sub_services && service.sub_services.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {service.sub_services.map((sub, idx) => {
                            const sizeClass = sub.page_size?.tailwind_class || 'md:col-span-4';
                            return (
                                <div key={sub.id} className={`${sizeClass} col-span-12`}>
                                    <ServiceCard
                                        service={{ ...sub, parentSlug: service.slug }}
                                        locale={activeLang}
                                        index={idx}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;
