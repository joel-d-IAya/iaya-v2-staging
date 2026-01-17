
import fs from 'fs';

async function checkPodcasts() {
    try {
        const response = await fetch("https://cms.iaya.cloud/items/recreo_content?limit=1");
        const json = await response.json();
        const item = json.data[0];
        if (!item) {
            console.log("No recreo content found");
            return;
        }

        const podcasts = [
            { lang: 'ES', id: item.podcast_es },
            { lang: 'FR', id: item.podcast_fr },
            { lang: 'EN', id: item.podcast_en }
        ];

        let results = `Checking podcasts for item: ${item.title}\n`;
        for (const p of podcasts) {
            if (p.id) {
                const url = `https://cms.iaya.cloud/assets/${p.id}`;
                const r = await fetch(url, { method: 'HEAD' });
                results += `Podcast [${p.lang}] ID: ${p.id} Status: ${r.status} Content-Type: ${r.headers.get('content-type')}\n`;
            } else {
                results += `Podcast [${p.lang}] not found in item.\n`;
            }
        }
        fs.writeFileSync('podcast_check.txt', results);
        console.log("Results written to podcast_check.txt");
    } catch (e) {
        console.error("Error:", e.message);
    }
}

checkPodcasts();
