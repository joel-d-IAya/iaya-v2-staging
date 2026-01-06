
import fs from 'fs';
async function run() {
    try {
        const collections = ['services', 'daily_news', 'projects'];
        let results = "";
        for (const col of collections) {
            const url = `https://cms.iaya.cloud/items/${col}?limit=1`;
            const r = await fetch(url);
            results += `--- ${col} ---\n`;
            if (r.status === 200) {
                const data = await r.json();
                if (data.data && data.data[0]) {
                    results += JSON.stringify(data.data[0], null, 2) + "\n";
                } else {
                    results += "Empty data\n";
                }
            } else {
                results += `Error ${r.status}\n`;
            }
        }
        fs.writeFileSync('api_data_dump.txt', results);
        console.log("Done");
    } catch (e) {
        console.error(e);
    }
}
run();
