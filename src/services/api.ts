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
}

export interface Service {
    id: string;
    slug?: string;
    main_icon?: string;
    home_size?: {
        tailwind_class: string;
    };
    accent_color: string;
    translations: Translation[];
    sub_services?: Service[];
}

export interface NewsItem {
    id: string;
    publish_date: string;
    image?: string;
    slug?: string;
    translations: Translation[];
}

export interface RecreoItem {
    id: string;
    youtube_id?: string;
    video_url?: string;
    translations: Translation[];
}


export interface Project {
    id: string;
    tech_stack?: string[];
    image?: string;
    translations: Translation[];
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

export const getLocalizedContent = <T extends { translations?: Translation[] }>(
    item: T,
    currentLang: string
): Translation => {
    const translations = item.translations || [];
    if (translations.length === 0) return {};

    const targetCode = langMap[currentLang] || currentLang;

    // 1. Try exact match
    let translation = translations.find(t => t.languages_code === targetCode);

    // 2. Try partial match (e.g. "FR" in "fr-FR")
    if (!translation) {
        const lowerLang = currentLang.toLowerCase();
        translation = translations.find(t => t.languages_code?.toLowerCase().startsWith(lowerLang));
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
        yesterday: 'Hier'
    };
    if (lang === 'en') return {
        cta: 'Discover more',
        readMore: 'Read more',
        live: 'Last news',
        today: 'Today',
        yesterday: 'Yesterday'
    };
    return {
        cta: 'Descubrir más',
        readMore: 'Leer más',
        live: 'Última noticia',
        today: 'Hoy',
        yesterday: 'Ayer'
    }; // Default to ES
};

export const getAssetUrl = (id: string | undefined): string => {
    if (!id) return '';
    // We now use the proxy with automatic Authorization header
    return `${ASSETS_URL}/${id}`;
};

export const getAccentColor = (colorName: string): string => {
    const normalized = colorName?.toLowerCase();
    if (normalized === 'orange') return 'var(--color-iaya-orange)';
    if (normalized === 'turquoise') return 'var(--color-iaya-turquoise)';
    return 'var(--color-iaya-orange)';
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
    const data = await fetcher<Service>('services?fields=*,translations.*,home_size.tailwind_class&filter[show_on_home][_eq]=true');
    // Ensure "Formation, Agents, Automation" order and limit to 3 strictly
    return data
        .filter(s => !(s as any).internal_name?.includes('MARKETING'))
        .slice(0, 3);
};

export const fetchServiceBySlug = async (slug: string) => {
    const data = await fetcher<Service>(`services?fields=*,translations.*,sub_services.*,sub_services.translations.*&filter[slug][_eq]=${slug}`);
    return data[0] || null;
};

export const fetchNews = () =>
    fetcher<NewsItem>('daily_news?fields=*,translations.*&limit=4&sort=-publish_date');

export const fetchRecreo = () =>
    fetcher<RecreoItem>('recreo?fields=*,translations.*');


export const fetchProjects = () =>
    fetcher<Project>('projects?fields=*,translations.*&limit=3');

/**
 * Combined loader to verify initial state
 */
export const initApp = async () => {
    const results = await Promise.allSettled([
        fetchServices(),
        fetchNews(),
        fetchRecreo(),
        fetchProjects()
    ]);

    const success = results.every(r => r.status === 'fulfilled');
    if (success) {
        console.log("IAya API Init: Success");
    }
    return results;
};

