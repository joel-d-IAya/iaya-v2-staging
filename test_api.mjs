// Use process.env directly since we use --env-file
const API_URL = process.env.VITE_DIRECTUS_URL || 'https://cms.iaya.cloud';
const token = process.env.VITE_DIRECTUS_TOKEN;

async function testCollection(name) {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        const url = `${API_URL}/items/${name}?fields=*&limit=1`;
        const response = await fetch(url, { headers });
        console.log(`\n[${name}] URL: ${url}`);
        console.log(`[${name}] Status: ${response.status}`);

        if (!response.ok) {
            const err = await response.json().catch(() => ({ error: 'Not JSON' }));
            console.log(`[${name}] Error Body:`, JSON.stringify(err, null, 2));
        } else {
            const json = await response.json();
            console.log(`[${name}] Success! Count: ${json.data?.length}`);
            if (json.data && json.data.length > 0) {
                console.log(`[${name}] First Item Keys:`, Object.keys(json.data[0]).join(', '));
            } else {
                console.log(`[${name}] No data returned.`);
            }
        }
    } catch (e) {
        console.log(`[${name}] Exception: ${e.message}`);
    }
}

async function run() {
    console.log("Starting API Tests...");
    console.log("API_URL:", API_URL);
    console.log("Token present:", !!token);

    const collections = ['daily_news', 'services', 'recreo', 'recreos', 'projects', 'portfolio', 'portfolio_items'];

    for (const col of collections) {
        await testCollection(col);
    }
}

run();
