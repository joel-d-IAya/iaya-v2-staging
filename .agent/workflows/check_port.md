---
description: Clear development ports and verify application in browser using the Stabilized Master Prompt routine.
---

// turbo-all
Whenever requested to "verify the app on the browser" or "start the dev server", follow this stabilized routine:

1. **Pre-flight Cleanup**:
   Execute the port clearance script to ensure no "ghost" processes are running:
   `powershell -ExecutionPolicy Bypass -File ./clear_ports.ps1`

2. **Start the Development Server**:
   Launch the server:
   `npm run dev`

3. **"Wait-for-Green" Routine**:
   Wait for the terminal to explicitly confirm the listener is active on the IPv4 address:
   `Local: http://127.0.0.1:5173/`

4. **Single-Tab Verification**:
   Once confirmed, use the `browser_subagent` to open EXACTLY ONE tab to `http://127.0.0.1:5173/`.
   - If a connection error occurs, IMMEDIATELY close the tab.
   - Return to the Terminal to check for process errors.
   - Do not open multiple tabs.
