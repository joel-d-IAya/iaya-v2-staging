
import fs from 'fs';
async function run() {
    try {
        const url = "https://cms.iaya.cloud/items/services?fields=*&limit=1";
        const response = await fetch(url);
        const json = await response.json();
        let output = "";
        output += "Services Keys: " + Object.keys(json.data[0] || {}).join(', ') + "\n";

        const newsUrl = "https://cms.iaya.cloud/items/daily_news?fields=*&limit=1";
        const newsResponse = await fetch(newsUrl);
        const newsJson = await newsResponse.json();
        output += "Daily News Keys: " + Object.keys(newsJson.data[0] || {}).join(', ') + "\n";

        const recreoSearch = ['recreo', 'recreos', 'el_recreo', 'elrecreo', 'youtube', 'videos'];
        for (const name of recreoSearch) {
            const r = await fetch(`https://cms.iaya.cloud/items/${name}?limit=1`);
            output += `Collection [${name}] status: ${r.status}\n`;
            if (r.status === 200) {
                const data = await r.json();
                output += `  Keys for [${name}]: ${Object.keys(data.data[0] || {}).join(', ')}\n`;
            }
        }
        fs.writeFileSync('probe_results.txt', output);
        console.log("Results written to probe_results.txt");
    } catch (e) {
        console.error("Error:", e.message);
    }
}
run();
