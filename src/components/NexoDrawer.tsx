import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, MessageCircle, ChevronDown } from 'lucide-react';
import type { Service } from '../services/api';
import { getLocalizedContent, submitProspect } from '../services/api';

interface NexoDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    activeLang: string;
    allServices: Service[];
    defaultServiceSlug?: string;
    defaultSubServiceSlug?: string;
}

const NexoDrawer: React.FC<NexoDrawerProps> = ({
    isOpen,
    onClose,
    activeLang,
    allServices,
    defaultServiceSlug,
    defaultSubServiceSlug
}) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        whatsapp: '+593 ',
        expectations: [] as string[],
        project_description: ''
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // Reset expectations based on default selection when opening
    useEffect(() => {
        if (isOpen) {
            const initialExpectations: string[] = [];
            if (defaultSubServiceSlug) {
                initialExpectations.push(`sub_${defaultSubServiceSlug}`);
            } else if (defaultServiceSlug) {
                initialExpectations.push(`service_${defaultServiceSlug}`);
            }
            setFormData(prev => ({ ...prev, expectations: initialExpectations }));
            setStatus('idle');
            setErrors({});
        }
    }, [isOpen, defaultServiceSlug, defaultSubServiceSlug]);

    const content = {
        ES: {
            title: '¡Hablemos de tu proyecto!',
            subtitle: 'Conecta con el futuro de tu negocio',
            firstName: 'Nombre',
            lastName: 'Apellido',
            email: 'Correo electrónico',
            whatsapp: 'WhatsApp',
            expectations: 'Selecciona tus servicios de interés',
            description: 'Cuéntanos un poco más...',
            submit: 'Enviar propuesta',
            success: '¡Mensaje recibido! Joel te contactará pronto.',
            error: 'Ocurrió un error. Reintenta por favor.',
            required: 'Este campo es obligatorio'
        },
        EN: {
            title: "Let's talk about your project!",
            subtitle: 'Connect with the future of your business',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email address',
            whatsapp: 'WhatsApp',
            expectations: 'Select your Services of interest',
            description: 'Tell us a bit more...',
            submit: 'Send proposal',
            success: 'Message received! Joel will contact you soon.',
            error: 'An error occurred. Please try again.',
            required: 'This field is required'
        },
        FR: {
            title: 'Parlons de votre projet !',
            subtitle: 'Connectez avec le futur de votre entreprise',
            firstName: 'Prénom',
            lastName: 'Nom',
            email: 'Adresse email',
            whatsapp: 'WhatsApp',
            expectations: 'Sélectionnez vos services d\'intérêt',
            description: 'Dites-nous en plus...',
            submit: 'Envoyer la proposition',
            success: 'Message reçu ! Joel vous contactera bientôt.',
            error: 'Une erreur est survenue. Veuillez réessayer.',
            required: 'Ce champ est obligatoire'
        }
    }[activeLang as 'ES' | 'EN' | 'FR'] || {
        title: '¡Hablemos de tu proyecto!',
        subtitle: 'Conecta con el futuro de tu negocio',
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo electrónico',
        whatsapp: 'WhatsApp',
        expectations: 'Servicios de interés',
        description: 'Cuéntanos un poco más...',
        submit: 'Enviar propuesta',
        success: '¡Mensaje recibido! Joel te contactará pronto.',
        error: 'Ocurrió un error. Reintenta por favor.',
        required: 'Este campo es obligatorio'
    };

    const validate = () => {
        const newErrors: Record<string, boolean> = {};
        if (!formData.first_name.trim()) newErrors.first_name = true;
        if (!formData.last_name.trim()) newErrors.last_name = true;
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
        if (formData.whatsapp.trim().length <= 5) newErrors.whatsapp = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');
        try {
            // Extract all selected services and sub-services from expectations array
            const selectedServices = formData.expectations
                .filter(id => id.startsWith('service_'))
                .map(id => id.replace('service_', ''))
                .join(', ');

            const selectedSubServices = formData.expectations
                .filter(id => id.startsWith('sub_'))
                .map(id => id.replace('sub_', ''))
                .join(', ');

            const payload = {
                ...formData,
                selected_service: selectedServices || null,
                selected_sub_service: selectedSubServices || null,
                language: activeLang.toLowerCase() === 'es' ? 'es-ES' : activeLang.toLowerCase() === 'fr' ? 'fr-FR' : 'en-US'
            };

            await submitProspect(payload);

            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const toggleExpectation = (id: string) => {
        setFormData(prev => ({
            ...prev,
            expectations: prev.expectations.includes(id)
                ? prev.expectations.filter(e => e !== id)
                : [...prev.expectations, id]
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-xl bg-iaya-bg border-l border-white/10 z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-iaya-ocre/20 border border-iaya-ocre/20">
                                    <MessageCircle size={24} className="text-iaya-ocre" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-outfit font-bold text-white tracking-tight">{content.title}</h2>
                                    <p className="text-sm text-white/40 uppercase tracking-widest font-medium">{content.subtitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-24 h-24 rounded-full bg-iaya-emerald/20 border border-iaya-emerald/20 flex items-center justify-center">
                                        <CheckCircle2 size={48} className="text-iaya-emerald" />
                                    </div>
                                    <h3 className="text-2xl font-outfit font-bold text-white">{content.success}</h3>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
                                    >
                                        Cerrar
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{content.firstName}</label>
                                            <input
                                                type="text"
                                                value={formData.first_name}
                                                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                                                className={`w-full bg-white/5 border ${errors.first_name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{content.lastName}</label>
                                            <input
                                                type="text"
                                                value={formData.last_name}
                                                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                                                className={`w-full bg-white/5 border ${errors.last_name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all`}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{content.email}</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all`}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{content.whatsapp}</label>
                                        <input
                                            type="tel"
                                            value={formData.whatsapp}
                                            onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                            className={`w-full bg-white/5 border ${errors.whatsapp ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-iaya-ocre font-bold focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all`}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{content.description}</label>
                                        <textarea
                                            rows={4}
                                            value={formData.project_description}
                                            onChange={e => setFormData({ ...formData, project_description: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all resize-none font-inter"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1 flex items-center gap-2">
                                            {content.expectations}
                                            <ChevronDown size={12} className="text-iaya-ocre" />
                                        </label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {allServices.map(s => {
                                                const sContent = getLocalizedContent(s, activeLang);
                                                const serviceId = `service_${s.slug}`;
                                                return (
                                                    <div key={s.id} className="space-y-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleExpectation(serviceId)}
                                                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm font-medium ${formData.expectations.includes(serviceId)
                                                                ? 'bg-iaya-ocre/20 border-iaya-ocre/50 text-white'
                                                                : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
                                                                }`}
                                                        >
                                                            {sContent.title}
                                                        </button>
                                                        {s.sub_services?.map(sub => {
                                                            const subContent = getLocalizedContent(sub, activeLang);
                                                            const subId = `sub_${sub.slug}`;
                                                            return (
                                                                <button
                                                                    key={sub.id}
                                                                    type="button"
                                                                    onClick={() => toggleExpectation(subId)}
                                                                    className={`w-full text-left p-2.5 ml-4 w-[calc(100%-1rem)] rounded-lg border transition-all text-xs font-inter ${formData.expectations.includes(subId)
                                                                        ? 'bg-iaya-emerald/20 border-iaya-emerald/50 text-white'
                                                                        : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20'
                                                                        }`}
                                                                >
                                                                    ↳ {subContent.title}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Footer */}
                        {status !== 'success' && (
                            <div className="p-8 border-t border-white/10">
                                <button
                                    onClick={handleSubmit}
                                    disabled={status === 'submitting'}
                                    className="w-full h-16 rounded-2xl text-black font-outfit font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(225,161,64,0.4)] active:scale-[0.98] hover:brightness-110"
                                    style={{ backgroundColor: '#E1A140' }}
                                >
                                    {status === 'submitting' ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            {content.submit}
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-center mt-4 text-xs font-inter">{content.error}</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NexoDrawer;
