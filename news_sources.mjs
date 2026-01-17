
import fs from 'fs';
async function run() {
    const r = await fetch('https://cms.iaya.cloud/items/daily_news_sources?limit=10');
    const j = await r.json();
    fs.writeFileSync('news_sources.json', JSON.stringify(j, null, 2));
}
run();
