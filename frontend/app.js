/* Minimal frontend that talks to the TodoList contract using MetaMask + ethers.js */

const ABI = [
  "function createTask(string text) external",
  "function toggleCompleted(uint id) external",
  "function getTasksCount() external view returns (uint)",
  "function getTask(uint id) external view returns (string memory, bool)"
];

let provider, signer, contract;

// Connect HTML elements
const connectBtn = document.getElementById("connectWallet");
const addBtn = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");
const tasksDiv = document.getElementById("tasks");
const statusDiv = document.getElementById("status");

// ✅ Put your deployed contract address here
const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function updateStatus(s) {
  statusDiv.innerText = s || "";
}

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install the MetaMask extension and try again.");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  updateStatus("Wallet connected: " + (await signer.getAddress()));

  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS.includes("PASTE")) {
    updateStatus("⚠️ Please set CONTRACT_ADDRESS in app.js to your deployed contract address.");
    return;
  }

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  await refreshTasks();
}

connectBtn.onclick = connectWallet;

addBtn.onclick = async () => {
  const text = newTaskInput.value.trim();
  if (!text) return alert("Enter a task text.");
  try {
    updateStatus("Sending transaction to create task...");
    const tx = await contract.createTask(text);
    await tx.wait();
    updateStatus("✅ Task created successfully!");
    newTaskInput.value = "";
    await refreshTasks();
  } catch (e) {
    console.error(e);
    alert("Transaction failed or was rejected.");
    updateStatus("");
  }
};

async function refreshTasks() {
  tasksDiv.innerHTML = "";
  if (!contract) return;

  try {
    const count = await contract.getTasksCount();
    const n = count.toNumber ? count.toNumber() : Number(count);

    if (n === 0) {
      tasksDiv.innerHTML = "<em>No tasks yet.</em>";
      return;
    }

    for (let i = 0; i < n; i++) {
      const t = await contract.getTask(i);
      const text = t[0];
      const completed = t[1];
      const el = document.createElement("div");
      el.className = "task";
      el.innerHTML = `
        <div>${completed ? "✅" : "⬜️"} <strong>${text}</strong></div>
        <div>
          <button data-id="${i}" class="toggleBtn">
            ${completed ? "Mark Undone" : "Mark Done"}
          </button>
        </div>
      `;
      tasksDiv.appendChild(el);
    }

    document.querySelectorAll(".toggleBtn").forEach((btn) => {
      btn.onclick = async (e) => {
        const id = e.target.getAttribute("data-id");
        try {
          updateStatus("Sending transaction to toggle task...");
          const tx = await contract.toggleCompleted(id);
          await tx.wait();
          updateStatus("✅ Task updated!");
          await refreshTasks();
        } catch (err) {
          console.error(err);
          alert("Transaction failed or was rejected.");
          updateStatus("");
        }
      };
    });
  } catch (e) {
    console.error(e);
    updateStatus("⚠️ Failed to fetch tasks.");
  }
}
