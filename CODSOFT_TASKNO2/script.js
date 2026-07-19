// ===== Get Elements =====
const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");

const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("filter");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const darkModeBtn = document.getElementById("darkModeBtn");
const message = document.getElementById("message");

// ===== Load Local Storage =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===== Add Task =====
addTaskBtn.addEventListener("click", function () {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        category: category.value || "General",
        priority: priority.value || "Medium",
        dueDate: dueDate.value || "No Due Date",
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    message.innerHTML = "✅ Task Added Successfully!";

    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);

    taskInput.value = "";
    category.value = "";
    priority.value = "";
    dueDate.value = "";
});

// ===== Save Tasks =====
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ===== Display Tasks =====
function displayTasks() {

    taskList.innerHTML = "";

    const search = searchInput.value.toLowerCase();

    const filterValue = filter.value;

    const filtered = tasks.filter(task => {

        const matchesSearch =
            task.text.toLowerCase().includes(search);

        const matchesFilter =
            filterValue === "all" ||
            (filterValue === "completed" && task.completed) ||
            (filterValue === "pending" && !task.completed);

        return matchesSearch && matchesFilter;

    });

    if (filtered.length === 0) {

        taskList.innerHTML = `
        <div class="empty">
        📭 No Tasks Found
        </div>
        `;

        updateStats();

        return;
    }

    filtered.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ?
            "task-item completed" :
            "task-item";

        li.innerHTML = `

<div class="task-content">

<h3>${task.text}</h3>

<p><b>Category:</b> ${task.category}</p>

<p><b>Priority:</b> ${task.priority}</p>

<p><b>Due Date:</b> ${task.dueDate}</p>

<p><b>Status:</b> ${task.completed ? "Completed" : "Pending"}</p>

</div>

<div class="actions">

<button class="completeBtn"
onclick="toggleTask(${task.id})">

${task.completed ? "↩ Undo" : "✔ Complete"}

</button>

<button class="editBtn"
onclick="editTask(${task.id})">

✏ Edit

</button>

<button class="deleteBtn"
onclick="deleteTask(${task.id})">

🗑 Delete

</button>

</div>

`;

        taskList.appendChild(li);

    });

    updateStats();

}

// ===== Search =====
searchInput.addEventListener("keyup", displayTasks);

// ===== Filter =====
filter.addEventListener("change", displayTasks);
// ===== Complete / Undo Task =====
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();

    displayTasks();

}

// ===== Edit Task =====
function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const updatedTask = prompt("Edit your task", task.text);

    if (updatedTask !== null && updatedTask.trim() !== "") {

        task.text = updatedTask.trim();

        saveTasks();

        displayTasks();

    }

}

// ===== Delete Task =====
function deleteTask(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();

        displayTasks();

    }

}

// ===== Update Statistics =====
function updateStats() {

    const completed = tasks.filter(task => task.completed).length;

    const pending = tasks.filter(task => !task.completed).length;

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}

// ===== Dark Mode =====
darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        darkModeBtn.innerHTML = "☀";

    } else {

        darkModeBtn.innerHTML = "🌙";

    }

});

// ===== Load Tasks on Page Load =====
displayTasks();