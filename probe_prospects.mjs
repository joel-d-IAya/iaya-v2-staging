
import fs from 'fs';
async function run() {
    try {
        const url = "https://cms.iaya.cloud/items/prospects?limit=1";
        const token = "MkFqoSUe6Xxxb8nPumDjPiKBTxRLvZqT";
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await response.json();
        let output = "";
        output += "Prospects Keys: " + Object.keys(json.data[0] || {}).join(', ') + "\n";
        fs.writeFileSync('prospects_keys.txt', output);
        console.log("Done");
    } catch (e) {
        console.error(e);
    }
}
run();
