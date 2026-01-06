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
    const token = import.meta.env.VITE_DIRECTUS_TOKEN;
    const baseUrl = `${ASSETS_URL}/${id}`;
    return token ? `${baseUrl}?access_token=${token}` : baseUrl;
};

export const getAccentColor = (colorName: string): string => {
    if (!colorName) return 'var(--color-iaya-orange)';
    const normalized = colorName.toLowerCase();
    if (normalized === 'orange') return 'var(--color-iaya-orange)';
    if (normalized === 'turquoise') return 'var(--color-iaya-turquoise)';
    // If it looks like a hex code or other CSS color, return it directly
    if (colorName.startsWith('#') || colorName.startsWith('rgb') || colorName.startsWith('oklch')) {
        return colorName;
    }
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

