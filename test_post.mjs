
async function run() {
    try {
        const url = "https://cms.iaya.cloud/items/prospects";
        const token = "MkFqoSUe6Xxxb8nPumDjPiKBTxRLvZqT";
        const payload = {
            first_name: "Test",
            last_name: "Agent",
            email: "test@iaya.cloud",
            whatsapp: "+593 999999999",
            language: "en-US",
            expectations: ["service_test"],
            project_description: "Probing response body"
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);
        console.log("Headers:", JSON.stringify([...response.headers.entries()]));

        const text = await response.text();
        console.log("Body:", text);

        if (text) {
            try {
                const json = JSON.parse(text);
                console.log("JSON:", JSON.stringify(json, null, 2));
            } catch (e) {
                console.log("Not valid JSON");
            }
        } else {
            console.log("Empty body");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
