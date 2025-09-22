// Append chat UI
function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Generic sender to backend
async function sendToBackend(body, isTask = false) {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    appendMessage("bot", data.reply || (isTask ? "No tips found" : "Error from bot"));
  } catch (error) {
    appendMessage("bot", "⚠️ Could not connect to server");
  }
}

// Normal chat
async function sendMessage() {
  const message = document.getElementById("user-input").value.trim();
  if (message) {
    await sendToBackend({ message });
  }
}

// Send task for tips
async function sendTask() {
  const title = document.getElementById("user-input").value.trim();
  if (title) {
    await sendToBackend({ title }, true);
  }
}

// =================== TASKS ===================
function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("task-buttons");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete");
  completeBtn.onclick = () => li.classList.toggle("done");

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => li.remove();

  btnContainer.appendChild(completeBtn);
  btnContainer.appendChild(deleteBtn);

  li.appendChild(btnContainer);
  document.getElementById("task-list").appendChild(li);

  input.value = "";
}
