
import fs from 'fs';
async function run() {
    try {
        const url = "https://cms.iaya.cloud/items/daily_news?fields=id,translations.*&limit=1";
        const response = await fetch(url);
        const json = await response.json();
        fs.writeFileSync('news_out.json', JSON.stringify(json, null, 2), 'utf8');
        console.log("Written to news_out.json");
    } catch (e) {
        console.error("Error:", e.message);
    }
}
run();
