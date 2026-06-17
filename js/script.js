const STORAGE_KEY = "todo-app-tasks";

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const tasksList = document.getElementById("tasksList");
const tasksCount = document.getElementById("tasksCount");
const emptyState = document.getElementById("emptyState");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");
const errorToast = document.getElementById("errorToast");

let tasks = loadTasks();
let currentFilter = "all";
let toastTimer;

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((t) => t?.id && typeof t.text === "string")
      : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    showError("Could not save — storage may be full");
  }
}

function showError(message) {
  clearTimeout(toastTimer);
  errorToast.textContent = message;
  errorToast.classList.add("visible");
  toastTimer = setTimeout(() => errorToast.classList.remove("visible"), 2500);
}

function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.completed);
  if (currentFilter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

function renderTasks() {
  const filtered = getFilteredTasks();
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  tasksList.innerHTML = "";
  tasksCount.textContent = `(${activeCount} active)`;
  clearCompletedBtn.hidden = completedCount === 0;
  emptyState.hidden = filtered.length > 0;

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item${task.completed ? " completed" : ""}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} aria-label="Mark task as ${task.completed ? "incomplete" : "complete"}" />
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button type="button" class="delete-btn" aria-label="Delete task" title="Delete">×</button>
    `;

    tasksList.appendChild(li);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function addTask(text) {
  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  renderTasks();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    showError("Please enter a task first");
    todoInput.focus();
    return;
  }

  addTask(text);
  todoInput.value = "";
  todoInput.focus();
});

tasksList.addEventListener("click", (event) => {
  const item = event.target.closest(".task-item");
  if (!item) return;

  const id = item.dataset.id;

  if (event.target.closest(".delete-btn")) {
    deleteTask(id);
  } else if (event.target.classList.contains("task-checkbox")) {
    toggleTask(id);
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

renderTasks();
todoInput.focus();
