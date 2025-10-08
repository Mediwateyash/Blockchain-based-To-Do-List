# Blockchain To‑Do List (MetaMask + Hardhat)

This is a minimal example project that shows how to build a simple on‑chain to‑do list using Solidity, Hardhat and a frontend that connects using MetaMask (ethers.js). Each "add task" and "toggle" is an on‑chain transaction which MetaMask will prompt for.

## What is included
- `contracts/TodoList.sol` — a tiny Solidity contract with `createTask` and `toggleCompleted`.
- `scripts/deploy.js` — deploy script for Hardhat.
- `frontend/` — static frontend that connects with MetaMask and interacts with the contract.
- `hardhat.config.js`, `package.json` — configuration and scripts.

## Prerequisites
- Node.js and npm (Node 16+ recommended).
- MetaMask extension installed in your browser (you mentioned you already have it).
- Basic familiarity with terminal / command prompt.

## Quick step-by-step (run everything locally)

1. Open a terminal and install dependencies:
   ```bash
   npm install
   ```

2. Start a local Hardhat node (Terminal A):
   ```bash
   npm run start-node
   ```
   This will print several sample accounts and their private keys and the RPC URL `http://127.0.0.1:8545`.
   Example output (you will get different keys):
   ```
   Accounts
   ========
   WARNING: These accounts are deterministic and only for local testing
   (private keys are displayed). Do NOT use them on real networks.
   ------------------------------------------------------------
   (0) 0xAb... (10000 ETH)
       Private Key: 0x59c6...
   ```

3. Connect MetaMask to your local Hardhat node:
   - Open MetaMask → Settings → Networks → Add network (or use "Add network manually").
   - Network Name: `Localhost 8545`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Save.

4. Import one of the private keys shown in the Hardhat node into MetaMask:
   - MetaMask → Account menu → Import Account → paste a private key from the Hardhat node console.
   - You will see a funded account (local ETH) — that's for signing transactions locally.

5. Deploy the contract (Terminal B):
   ```bash
   npm run deploy
   ```
   This runs `npx hardhat run scripts/deploy.js --network localhost` and prints the deployed contract address, e.g.:
   ```
   TodoList deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```

6. Paste the deployed contract address into `frontend/config.js` by replacing the placeholder string:
   ```js
   const CONTRACT_ADDRESS = "0x...paste here...";
   ```

7. Serve the frontend (Terminal C):
   ```bash
   npm run start-front
   ```
   Then open `http://localhost:5000` in your browser.

8. Use the app:
   - Click **Connect Wallet** → MetaMask will ask to connect the site.
   - Add a task in the input and click **Add Task (transaction)** → Confirm the transaction in MetaMask.
   - After the transaction is mined, the task will appear in the UI.
   - Toggle a task – this also triggers a MetaMask transaction.

## Notes & troubleshooting
- Make sure Hardhat node is running before deploying.
- If your frontend shows "Please set CONTRACT_ADDRESS", double-check `frontend/config.js` was edited and the page reloaded.
- If MetaMask refuses connection, make sure the current network in MetaMask is `Localhost 8545` and your imported account is one of the Hardhat accounts.
- These private keys and the chain are only local and for testing — never reuse them on public networks.
- To test on a public testnet you will need to configure a real network, wallet with testnet funds and update `hardhat.config.js` accordingly.

## Want me to (optional)
- Deploy the contract automatically and inject the deployed address into the frontend for you.
- Add a simple UI improvement (search, delete, edit).
- Convert frontend to React or add a backend.

Enjoy — tell me if you want the contract automatically deployed and the frontend updated with the address!