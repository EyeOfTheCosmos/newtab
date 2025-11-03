const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when the page loads
window.onload = loadTasks;

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  // Toggle completed when clicked
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text, li.classList.contains("completed"));
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.background = "#e74c3c";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = (e) => {
    e.stopPropagation(); // don't toggle
    li.remove();
    deleteTask(task.text);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// 🧩 Save a new task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🧩 Load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

// 🧩 Delete a task from localStorage
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🧩 Update a task’s completed status
function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(t => 
    t.text === taskText ? { ...t, completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
