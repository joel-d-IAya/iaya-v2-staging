import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import backgroundIncaStones from '../assets/background-inca-stones.png';
import SectionHeader from './SectionHeader';
import { submitProspect } from '../services/api';

interface NexoFormProps {
    locale: string;
}

const NexoForm: React.FC<NexoFormProps> = ({ locale }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        whatsapp: '+593 ',
        expectations: [] as string[],
        project_description: ''
    });

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const langMap: Record<string, string> = {
        FR: 'fr-FR',
        ES: 'es-ES',
        EN: 'en-US'
    };

    const content = {
        FR: {
            intro: "NOUS SOMMES À VOTRE SERVICE",
            title: "Prenez Contact avec IAya",
            formTitle: "Contactez-nous !",
            subtitle: "Comment vous appelez-vous ?",
            firstName: "Prénom",
            lastName: "Nom",
            email: "Votre email de confiance",
            phone: "Téléphone (WhatsApp)",
            phoneNote: "Note : Le contact se fera prioritairement via WhatsApp.",
            question: "Quelles sont vos attentes ?",
            descriptionLabel: "Aidez-nous à mieux définir vos besoins...",
            descriptionPlaceholder: "La sincérité est notre base.",
            submit: "Lancer la discussion",
            success: "Message reçu, Joel vous répondra personnellement.",
            error: "Une erreur est survenue. Veuillez réessayer.",
            invalidEmail: "Veuillez entrer une adresse email valide.",
            requiredField: "Ce champ est obligatoire."
        },
        ES: {
            intro: "ESTAMOS A SU SERVICIO",
            title: "Póngase en contacto con IAya",
            formTitle: "¡Comuníquese con nosotros!",
            subtitle: "¿Cómo se llama?",
            firstName: "Nombre",
            lastName: "Apellido",
            email: "Su correo electrónico de confianza",
            phone: "Teléfono (WhatsApp)",
            phoneNote: "Nota: El contacto se realizará prioritariamente a través de WhatsApp.",
            question: "¿Cuáles son sus expectativas?",
            descriptionLabel: "Ayúdenos a definir mejor sus necesidades...",
            descriptionPlaceholder: "La sinceridad es nuestra base.",
            submit: "Iniciar la discusión",
            success: "Mensaje recibido, Joel le responderá personalmente.",
            error: "Ocurrió un error. Por favor, inténtelo de nuevo.",
            invalidEmail: "Por favor, ingrese un correo electrónico válido.",
            requiredField: "Este campo es obligatorio."
        },
        EN: {
            intro: "WE ARE AT YOUR SERVICE",
            title: "Get in touch with IAya",
            formTitle: "Contact us!",
            subtitle: "What is your name?",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Your trusted email",
            phone: "Phone (WhatsApp)",
            phoneNote: "Note: Contact will primarily take place via WhatsApp.",
            question: "What are your expectations?",
            descriptionLabel: "Help us better define your needs...",
            descriptionPlaceholder: "Sincerity is our foundation.",
            submit: "Start the discussion",
            success: "Message received, Joel will reply to you personally.",
            error: "An error occurred. Please try again.",
            invalidEmail: "Please enter a valid email address.",
            requiredField: "This field is required."
        }
    }[locale] || {
        intro: "ESTAMOS A SU SERVICIO",
        title: "Póngase en contacto con IAya",
        formTitle: "¡Comuníquese con nosotros!",
        subtitle: "¿Cómo se llama?",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Su correo electrónico de confianza",
        phone: "Teléfono (WhatsApp)",
        phoneNote: "Nota: El contacto se realizará prioritariamente a través de WhatsApp.",
        question: "¿Cuáles son sus expectativas?",
        descriptionLabel: "Ayúdenos a definir mejor sus necesidades...",
        descriptionPlaceholder: "La sinceridad es nuestra base.",
        submit: "Iniciar la discusión",
        success: "Mensaje recibido, Joel le responderá personalmente.",
        error: "Ocurrió un error. Por favor, inténtelo de nuevo.",
        invalidEmail: "Por favor, ingrese un correo electrónico válido.",
        requiredField: "Este campo es obligatorio."
    };

    const expectationsList = [
        { id: 'transform_ia', fr: '🚀 Transformer entreprise/ONG avec l\'IA', es: '🚀 Transformar mi empresa/ONG con la IA', en: '🚀 Transform business/NGO with AI' },
        { id: 'agent_ia', fr: '🤖 Créer un agent IA spécifique', es: '🤖 Crear un agente IA específico', en: '🤖 Create a specific AI agent' },
        { id: 'automation', fr: '⚙️ Automatiser les flux internes', es: '⚙️ Automatizar flujos internos', en: '⚙️ Automate internal workflows' },
        { id: 'rag', fr: '📚 Développer un RAG (Analyse docs)', es: '📚 Desarrollar un RAG (Análisis docs)', en: '📚 Develop a RAG (Doc analysis)' },
        { id: 'training', fr: '🎓 Formations et ateliers', es: '🎓 Capacitaciones y talleres', en: '🎓 Training and workshops' },
        { id: 'audit', fr: '🔍 Audit et Rendez-vous', es: '🔍 Auditoría y Cita', en: '🔍 Audit and Appointment' },
        { id: 'seminar', fr: '🎤 Intervention séminaire', es: '🎤 Intervención en seminario', en: '🎤 Seminar speaking' },
        { id: 'dev_web', fr: '📱 Site web / App mobile', es: '📱 Sitio web / App móvil', en: '📱 Website / Mobile app' },
        { id: 'cuenca_chat', fr: '💬 Discussion futur Cuenca', es: '💬 Conversar sobre el futuro de Cuenca', en: '💬 Chat about Cuenca\'s future' },
        { id: 'other', fr: '❓ Autre', es: '❓ Otro', en: '❓ Other' },
    ];

    const toggleExpectation = (id: string) => {
        setFormData(prev => ({
            ...prev,
            expectations: prev.expectations.includes(id)
                ? prev.expectations.filter(e => e !== id)
                : [...prev.expectations, id]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, boolean> = {};

        if (!formData.first_name.trim()) newErrors.first_name = true;
        if (!formData.last_name.trim()) newErrors.last_name = true;
        if (!validateEmail(formData.email)) newErrors.email = true;
        if (formData.whatsapp.trim().length <= 5) newErrors.whatsapp = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStatus('submitting');

        const payload = {
            ...formData,
            selected_service: formData.expectations.join(', '),
            selected_sub_service: null,
            language: langMap[locale] || 'es-ES'
        };

        try {
            // 1. Centralized Directus POST
            await submitProspect(payload);

            // 2. Mailto Generation
            const expectationsString = expectationsList
                .filter(ext => formData.expectations.includes(ext.id))
                .map(ext => ext[locale.toLowerCase() as 'fr' | 'es' | 'en'] || ext.es)
                .join(', ');

            const mailSubject = `Nouveau Contact IAya - ${formData.first_name} ${formData.last_name}`;
            const mailBody = `Prénom: ${formData.first_name}\nNom: ${formData.last_name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nAttentes: ${expectationsString}\n\nDescription:\n${formData.project_description}`;

            const mailtoUrl = `mailto:joel.devalez@gmail.com;joel@iaya.cloud?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

            window.location.href = mailtoUrl;

            setStatus('success');
            // Reset form after success delay if needed or keep success state
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="nexo" className="py-32 bg-[oklch(0.13_0.01_240)] relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat bg-[length:400px]"
                style={{ backgroundImage: `url(${backgroundIncaStones})` }}
            />

            <div className="max-w-7xl mx-auto px-8 relative">
                <SectionHeader
                    intro={(content as any).intro}
                    title={(content as any).title}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-8 lg:p-16 rounded-[50px] bg-iaya-nav border border-white/10 backdrop-blur-2xl shadow-2xl relative"
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-iaya-ocre/20 to-iaya-emerald/20 rounded-[51px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-iaya-ocre/20 flex items-center justify-center border border-iaya-ocre/30">
                                <MessageCircle className="text-iaya-ocre w-6 h-6" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl lg:text-4xl font-outfit font-bold text-white tracking-tighter">
                                    {(content as any).formTitle}
                                </h2>
                                <p className="text-iaya-ocre font-outfit text-sm uppercase tracking-[0.2em] font-bold">
                                    {content.subtitle}
                                </p>
                            </div>
                        </div>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-20 text-center"
                            >
                                <CheckCircle2 className="w-20 h-20 text-iaya-emerald mx-auto mb-6" />
                                <h3 className="text-2xl font-outfit font-bold text-white mb-4">{content.success}</h3>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    Envoyer un autre message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white/40 font-outfit text-xs uppercase tracking-widest ml-4">{content.firstName}</label>
                                        <input
                                            type="text"
                                            value={formData.first_name}
                                            onChange={e => {
                                                setFormData({ ...formData, first_name: e.target.value });
                                                if (errors.first_name) setErrors({ ...errors, first_name: false });
                                            }}
                                            className={`w-full h-16 px-6 rounded-2xl bg-white/5 border ${errors.first_name ? 'border-red-500/50' : 'border-white/10'} focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all text-white font-inter`}
                                        />
                                        {errors.first_name && (
                                            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] text-red-400 ml-4 font-inter mt-1">
                                                {(content as any).requiredField}
                                            </motion.p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 font-outfit text-xs uppercase tracking-widest ml-4">{content.lastName}</label>
                                        <input
                                            type="text"
                                            value={formData.last_name}
                                            onChange={e => {
                                                setFormData({ ...formData, last_name: e.target.value });
                                                if (errors.last_name) setErrors({ ...errors, last_name: false });
                                            }}
                                            className={`w-full h-16 px-6 rounded-2xl bg-white/5 border ${errors.last_name ? 'border-red-500/50' : 'border-white/10'} focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all text-white font-inter`}
                                        />
                                        {errors.last_name && (
                                            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] text-red-400 ml-4 font-inter mt-1">
                                                {(content as any).requiredField}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white/40 font-outfit text-xs uppercase tracking-widest ml-4">{content.email}</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => {
                                                setFormData({ ...formData, email: e.target.value });
                                                if (errors.email) setErrors({ ...errors, email: false });
                                            }}
                                            className={`w-full h-16 px-6 rounded-2xl bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all text-white font-inter`}
                                        />
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-[10px] text-red-400 ml-4 font-inter mt-1"
                                            >
                                                {formData.email.trim() ? (content as any).invalidEmail : (content as any).requiredField}
                                            </motion.p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 font-outfit text-xs uppercase tracking-widest ml-4">{content.phone}</label>
                                        <input
                                            type="tel"
                                            value={formData.whatsapp}
                                            onChange={e => {
                                                setFormData({ ...formData, whatsapp: e.target.value });
                                                if (errors.whatsapp) setErrors({ ...errors, whatsapp: false });
                                            }}
                                            className={`w-full h-16 px-6 rounded-2xl bg-white/5 border ${errors.whatsapp ? 'border-red-500/50' : 'border-white/10'} focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all text-white font-inter text-iaya-ocre font-bold`}
                                        />
                                        {errors.whatsapp && (
                                            <p className="text-[10px] text-red-400 ml-4 font-inter mt-1">{(content as any).requiredField}</p>
                                        )}
                                        <p className="text-[10px] text-white/20 ml-4 font-inter">{content.phoneNote}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-white/40 font-outfit text-xs uppercase tracking-widest ml-4">{content.question} (Multi-select)</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {expectationsList.map(item => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => toggleExpectation(item.id)}
                                                className={`text-left p-4 rounded-xl border transition-all duration-300 font-inter text-sm ${formData.expectations.includes(item.id)
                                                    ? 'bg-iaya-ocre/20 border-iaya-ocre text-white'
                                                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                                                    }`}
                                            >
                                                {item[locale.toLowerCase() as 'fr' | 'es' | 'en'] || item.es}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white/40 font-outfit text-xs uppercase tracking-widest ml-4">{content.descriptionLabel}</label>
                                    <textarea
                                        rows={4}
                                        value={formData.project_description}
                                        onChange={e => setFormData({ ...formData, project_description: e.target.value })}
                                        placeholder={content.descriptionPlaceholder}
                                        className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 focus:border-iaya-ocre/50 focus:bg-white/10 outline-none transition-all text-white font-inter resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        disabled={status === 'submitting'}
                                        type="submit"
                                        className="w-full h-20 rounded-2xl bg-gradient-to-r from-iaya-ocre to-iaya-ocre/80 hover:from-iaya-emerald hover:to-iaya-emerald/80 text-[silver] font-outfit font-bold text-xl transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50"
                                    >
                                        {status === 'submitting' ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                {content.submit}
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                        {/* Light Sweep Effect */}
                                        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-white/20 skew-x-[35deg] group-hover:left-[150%] transition-all duration-1000" />
                                    </button>
                                    {status === 'error' && (
                                        <p className="text-red-400 text-center mt-4 font-inter text-sm">{content.error}</p>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NexoForm;
