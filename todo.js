// todo.js

window.addEventListener("load", () => {
  loadTasks();
});

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { text, completed: false };
  addTaskToDOM(task);
  saveTask(task);
  taskInput.value = "";
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  if (task.completed) li.classList.add("completed");

  li.onclick = () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text, li.classList.contains("completed"));
  };

  const del = document.createElement("button");
  del.textContent = "X";
  del.onclick = e => {
    e.stopPropagation();
    li.remove();
    deleteTask(task.text);
  };

  li.appendChild(del);
  taskList.appendChild(li);
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  localStorage.setItem("tasks", JSON.stringify(
    tasks.map(t => t.text === text ? { ...t, completed } : t)
  ));
}
