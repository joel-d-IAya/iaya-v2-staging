
import fs from 'fs';
async function run() {
    try {
        const url1 = "https://cms.iaya.cloud/items/services_translations?limit=1";
        const r1 = await fetch(url1);
        const j1 = await r1.json();

        const url2 = "https://cms.iaya.cloud/items/daily_news_translations?limit=1";
        const r2 = await fetch(url2);
        const j2 = await r2.json();

        let out = "";
        out += "Services Translation Keys: " + Object.keys(j1.data[0] || {}).join(', ') + "\n";
        out += "Daily News Translation Keys: " + Object.keys(j2.data[0] || {}).join(', ') + "\n";
        fs.writeFileSync('trans_keys.txt', out);
        console.log("Done");
    } catch (e) {
        console.error(e);
    }
}
run();
