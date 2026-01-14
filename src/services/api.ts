const API_URL = import.meta.env.VITE_DIRECTUS_URL || '/cms-api';
export const ASSETS_URL = import.meta.env.VITE_DIRECTUS_URL
    ? `${import.meta.env.VITE_DIRECTUS_URL}/assets`
    : `/cms-api/assets`;

// --- Types ---

export interface Translation {
    languages_code?: string;
    title?: string;
    summary?: string;
    content?: string;
    description?: string;
    cta_text?: string;
    label?: string;
    recreo_content?: string;
    full_content?: string;
    slug?: string;
    nexus?: string;
    source?: string;
    challenge?: string;
    solution?: string;
    excerpt?: string;
    results_metrics?: string;
    examples?: string[];
}

export interface Service {
    id: string | number;
    slug: string;
    status: string;
    show_on_home?: boolean;
    main_icon?: string;
    home_size?: {
        tailwind_class: string;
    };
    page_size?: {
        tailwind_class: string;
    };
    accent_color: string;
    translations: Translation[];
    sub_services?: Service[];
}

export interface NewsItem {
    id: string | number;
    publish_date: string;
    image?: string;
    slug: string;
    translations: Translation[];
}

export interface RecreoItem {
    id: string | number;
    title: string;
    video_id?: string;
    language?: string;
    publish_date?: string;
    podcast_fr?: string;
    podcast_es?: string;
    podcast_en?: string;
    infographic_square?: string;
    infographic_hor?: string;
    infographic_vert?: string;
}


export interface PortfolioItem {
    id: string | number;
    slug: string;
    status: string;
    accent_color: string;
    main_icon?: string;
    main_image?: string;
    home_size?: {
        tailwind_class: string;
    };
    show_on_home?: boolean;
    related_url?: string;
    sort?: number;
    translations: Translation[];
    portfolio_translations?: Translation[];
    sub_services?: any[]; // Junctions or populated sub-services
    files?: any[]; // portfolio_files
}

// --- Helpers ---

// Per instructions: fr: 'fr-FR', es: 'es-ES', en: 'en-US'
const langMap: Record<string, string> = {
    'fr': 'fr-FR',
    'es': 'es-ES',
    'en': 'en-US',
    'FR': 'fr-FR',
    'ES': 'es-ES',
    'EN': 'en-US'
};

export const getLocalizedContent = (
    item: any,
    currentLang: string
): Translation => {
    const translations = (item?.translations?.length > 0 ? item.translations : null) ||
        (item?.portfolio_translations?.length > 0 ? item.portfolio_translations : null) ||
        (item?.projects_translations?.length > 0 ? item.projects_translations : null) ||
        (item?.daily_news_translations?.length > 0 ? item.daily_news_translations : null) ||
        [];
    if (translations.length === 0) return {};

    const targetCode = langMap[currentLang] || currentLang;

    // 1. Try exact match
    let translation = translations.find((t: any) => t.languages_code === targetCode);

    // 2. Try partial match (e.g. "FR" in "fr-FR")
    if (!translation) {
        const lowerLang = currentLang.toLowerCase();
        translation = translations.find((t: any) => t.languages_code?.toLowerCase().startsWith(lowerLang));
    }

    // 3. Absolute fallback: take the first translation record available
    if (!translation && translations.length > 0) {
        translation = translations[0];
    }

    return translation || {};
};

export const getUiLabels = (currentLang: string) => {
    const lang = currentLang.toLowerCase();
    if (lang === 'fr') return {
        cta: 'Découvrir plus',
        readMore: 'En savoir plus',
        live: 'Dernière information',
        today: 'Aujourd\'hui',
        yesterday: 'Hier',
        readAllNews: 'Lire toutes les Actualités',
        nexusLabel: 'Impact sur le Marché Équatorien',
        source: 'Source',
        nextNews: 'Actualité suivante',
        prevNews: 'Actualité précédente',
        exploreCaseStudy: 'Explorer le cas d\'étude',
        newsArchive: 'Actualités',
        serviceDetails: 'Plus de détails sur ce service',
        back: 'Retour',
        interestedHeader: 'Intéressé par ce service ?',
        contactNow: 'Contactez-nous',
        relatedLinksHeader: 'Explorer plus de solutions'
    };
    if (lang === 'en') return {
        cta: 'Discover more',
        readMore: 'Read more',
        live: 'Last news',
        today: 'Today',
        yesterday: 'Yesterday',
        readAllNews: 'Read all the news',
        nexusLabel: 'Impact on the Ecuadorian Market',
        source: 'Source',
        nextNews: 'Next News',
        prevNews: 'Previous News',
        exploreCaseStudy: 'Explore Case Study',
        newsArchive: 'Archive',
        serviceDetails: 'More details about this service',
        back: 'Back',
        interestedHeader: 'Interested in this service?',
        contactNow: 'Contact Now',
        relatedLinksHeader: 'Explore more solutions'
    };
    return {
        cta: 'Descubrir más',
        readMore: 'Leer más',
        live: 'Última noticia',
        today: 'Hoy',
        yesterday: 'Ayer',
        readAllNews: 'Leer todas las noticias',
        nexusLabel: 'Impacto por el Mercado Ecuatoriano',
        source: 'Fuente',
        nextNews: 'Siguiente noticia',
        prevNews: 'Noticia anterior',
        exploreCaseStudy: 'Explorar Caso de Éxito',
        newsArchive: 'Noticias',
        serviceDetails: 'Más detalles sobre este servicio',
        back: 'Volver',
        interestedHeader: '¿Interesado en este servicio?',
        contactNow: 'Contactar Ahora',
        relatedLinksHeader: 'Explorar más soluciones'
    }; // Default to ES
};

export const toSlug = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD') // Supprimer les accents
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '') // Supprimer caractères spéciaux
        .trim()
        .replace(/\s+/g, '-') // Espaces -> tirets
        .replace(/-+/g, '-'); // Éviter tirets multiples
};

export const getAssetUrl = (id: string | undefined): string => {
    if (!id) return '';
    const token = import.meta.env.VITE_DIRECTUS_TOKEN;
    const baseUrl = `${ASSETS_URL}/${id}`;
    return token ? `${baseUrl}?access_token=${token}` : baseUrl;
};

export const getAccentColor = (colorName: string): string => {
    if (!colorName) return 'var(--color-iaya-orange)';
    const normalized = colorName.toLowerCase();

    // Internal Tokens
    if (normalized === 'orange') return 'var(--color-iaya-orange)';
    if (normalized === 'turquoise') return 'var(--color-iaya-turquoise)';

    // Return the color directly (handles hex, oklch, and standard CSS color names)
    return colorName;
};

/**
 * WCAG 2.2 Contrast Helper
 * Determines if text should be black or white based on background color luminance.
 */
export const getContrastColor = (hexOrName: string): 'black' | 'white' => {
    if (!hexOrName) return 'white';

    // Default system colors for IAya
    if (hexOrName.includes('orange')) return 'white';
    if (hexOrName.includes('turquoise')) return 'black';

    // Very basic check for standard colors
    const lightColors = ['white', 'yellow', 'cyan', 'lime', 'pink'];
    if (lightColors.includes(hexOrName.toLowerCase())) return 'black';

    // For hex colors
    if (hexOrName.startsWith('#')) {
        const hex = hexOrName.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? 'black' : 'white';
    }

    return 'white';
};

// --- API Calls ---

async function fetcher<T>(endpoint: string): Promise<T[]> {
    const token = import.meta.env.VITE_DIRECTUS_TOKEN;
    const headers: Record<string, string> = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}/items/${endpoint}`, { headers });
        if (!response.ok) throw new Error(`Fetch Error: ${response.status}`);
        const json = await response.json();
        return json.data || [];
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        return [];
    }
}

export const fetchServices = async () => {
    // FILTRE: published ET show_on_home
    return await fetcher<Service>('services?fields=*,home_size.tailwind_class,translations.*&filter[status][_eq]=published&filter[show_on_home][_eq]=true&sort=sort');
};

export const fetchAllServices = async () => {
    // Récupère tout le catalogue publié
    const data = await fetcher<any>('services?fields=*,home_size.tailwind_class,page_size.tailwind_class,translations.*,sub_services.sub_services_id.*,sub_services.sub_services_id.translations.*,sub_services.sub_services_id.page_size.tailwind_class&filter[status][_eq]=published&sort=sort');

    return data.map(s => ({
        ...s,
        sub_services: s.sub_services?.map((junction: any) => junction.sub_services_id)
            .filter((sub: any) => sub && sub.status === 'published') || []
    }));
};

export const fetchServiceBySlug = async (slug: string) => {
    const encodedSlug = encodeURIComponent(slug);
    // RECHERCHE PAR SLUG (SEO Friendly)
    const data = await fetcher<any>(`services?fields=*,home_size.tailwind_class,page_size.tailwind_class,translations.*,sub_services.sub_services_id.*,sub_services.sub_services_id.translations.*,sub_services.sub_services_id.page_size.tailwind_class&filter[slug][_eq]=${encodedSlug}&filter[status][_eq]=published`);

    if (data.length === 0) return null;

    const s = data[0];
    return {
        ...s,
        sub_services: s.sub_services?.map((junction: any) => junction.sub_services_id)
            .filter((sub: any) => sub && sub.status === 'published') || []
    };
};

export const fetchNews = () =>
    fetcher<NewsItem>('daily_news?fields=*,translations.*&limit=4&sort=-publish_date');

export const fetchAllNews = () =>
    fetcher<NewsItem>('daily_news?fields=*,translations.*&sort=-publish_date');

export const fetchRecreo = () =>
    fetcher<RecreoItem>('recreo_content?fields=*&sort=-publish_date');


export const fetchPortfolio = async () => {
    const data = await fetcher<PortfolioItem>('portfolio?fields=*,home_size.tailwind_class,translations.*,portfolio_translations.*&filter[status][_eq]=published&filter[show_on_home][_eq]=true&sort=sort');

    // Add translations fallback for each item
    for (const item of data) {
        if (!item.portfolio_translations || item.portfolio_translations.length === 0) {
            item.portfolio_translations = await fetcher<any>(`portfolio_translations?filter[portfolio_id][_eq]=${item.id}`);
        }
    }
    return data;
};

export const fetchAllPortfolio = async () => {
    const data = await fetcher<PortfolioItem>('portfolio?fields=*,home_size.tailwind_class,translations.*,portfolio_translations.*&filter[status][_eq]=published&sort=sort');

    // Add translations fallback for each item
    for (const item of data) {
        if (!item.portfolio_translations || item.portfolio_translations.length === 0) {
            item.portfolio_translations = await fetcher<any>(`portfolio_translations?filter[portfolio_id][_eq]=${item.id}`);
        }
    }
    return data;
};

export const fetchPortfolioBySlug = async (slug: string) => {
    const data = await fetcher<any>(`portfolio?fields=*,translations.*,portfolio_translations.*,portfolio_sub_services.sub_services_id.*,portfolio_sub_services.sub_services_id.translations.*,portfolio_sub_services.sub_services_id.portfolio_translations.*,portfolio_files.directus_files_id.*&filter[slug][_eq]=${encodeURIComponent(slug)}&filter[status][_eq]=published`);

    if (data.length === 0) return null;

    const p = data[0];

    // Fallback for translations if missing from alias
    if (!p.portfolio_translations || p.portfolio_translations.length === 0) {
        const trans = await fetcher<any>(`portfolio_translations?filter[portfolio_id][_eq]=${p.id}`);
        p.portfolio_translations = trans;
    }

    // Fallback for sub_services if missing from alias
    let subServicesJunctions = p.portfolio_sub_services || p.sub_services;
    if (!subServicesJunctions || subServicesJunctions.length === 0) {
        subServicesJunctions = await fetcher<any>(`portfolio_sub_services?fields=*,sub_services_id.*,sub_services_id.translations.*&filter[portfolio_id][_eq]=${p.id}`);
    }

    // Fallback for files if missing from alias
    let filesJunctions = p.portfolio_files || p.files;
    if (!filesJunctions || filesJunctions.length === 0) {
        filesJunctions = await fetcher<any>(`portfolio_files?fields=*,directus_files_id.*&filter[portfolio_id][_eq]=${p.id}`);
    }

    return {
        ...p,
        sub_services: subServicesJunctions?.map((j: any) => j.sub_services_id).filter((s: any) => s && (s.status === 'published' || !s.status)) || [],
        files: filesJunctions?.map((j: any) => j.directus_files_id).filter((f: any) => f) || []
    } as PortfolioItem;
};

export const submitProspect = async (payload: any) => {
    const response = await fetch(`${API_URL}/items/prospects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to submit prospect');
    return response.json();
};

/**
 * Combined loader to verify initial state
 */
export const initApp = async () => {
    const results = await Promise.allSettled([
        fetchServices(),
        fetchNews(),
        fetchRecreo(),
        fetchPortfolio()
    ]);

    const success = results.every(r => r.status === 'fulfilled');
    if (success) {
        console.log("IAya API Init: Success");
    }
    return results;
};

