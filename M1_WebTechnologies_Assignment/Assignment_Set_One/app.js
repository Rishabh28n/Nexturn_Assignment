// Drag-and-Drop Handlers
let draggedItem = null;

function handleDragStart(event) {
    draggedItem = this;
    setTimeout(() => (this.style.display = "none"), 0); // Temporarily hide the item
}

function handleDragOver(event) {
    event.preventDefault(); // Allow dropping
}

function handleDrop(event) {
    event.preventDefault();

    // Check if the drop target is within the task list
    if (this.parentElement && this.parentElement.id === "taskList") {
        this.parentElement.insertBefore(draggedItem, this);
    } else if (this.id === "taskList") {
        // Allow dropping at the end of the list
        this.appendChild(draggedItem);
    }

    draggedItem.style.display = "flex"; // Restore item visibility
    draggedItem = null;

    // Save new order to localStorage
    saveTasks();
}

// Ensure that the dragged item always reappears even if dropped outside
function handleDragEnd() {
    if (draggedItem) {
        draggedItem.style.display = "flex"; // Make the item visible again
        draggedItem = null;
    }
}

// Create task element with drag-and-drop and click listeners
function createTaskElement(taskText, isCompleted) {
    let newTask = document.createElement("li");
    newTask.setAttribute("draggable", "true"); // Make task draggable
    newTask.innerHTML = `
        <span>${taskText}</span>
        <button class="remove-btn" onclick="removeTask(this)">Delete</button>
    `;
    if (isCompleted) {
        newTask.classList.add("completed");
    }

    // Toggle completed state
    newTask.addEventListener('click', function (event) {
        if (!event.target.classList.contains('remove-btn')) {
            newTask.classList.toggle("completed");
            saveTasks(); // Update localStorage when task status changes
            updatePendingCount(); // Update pending count
        }
    });

    // Attach drag-and-drop handlers
    newTask.addEventListener("dragstart", handleDragStart);
    newTask.addEventListener("dragover", handleDragOver);
    newTask.addEventListener("drop", handleDrop);

    return newTask;
}

// Add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText) {
        let taskList = document.getElementById("taskList");
        let newTask = createTaskElement(taskText, false);
        taskList.appendChild(newTask);
        taskInput.value = "";
        saveTasks();
        updatePendingCount();
    }
}

// Remove a task
function removeTask(taskButton) {
    let taskToRemove = taskButton.parentElement;
    taskToRemove.remove();
    saveTasks();
    updatePendingCount();
}

// Save tasks to localStorage
function saveTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = [];
    taskList.querySelectorAll("li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").textContent,
            isCompleted: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach((task) => {
        let taskElement = createTaskElement(task.text, task.isCompleted);
        taskList.appendChild(taskElement);
    });
    updatePendingCount();
}

// Update the count of pending tasks
function updatePendingCount() {
    let taskList = document.getElementById("taskList");
    let pendingCount = taskList.querySelectorAll("li:not(.completed)").length;
    document.getElementById("pendingCount").textContent = `Pending tasks: ${pendingCount}`;
}

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    document.addEventListener("dragend", handleDragEnd); // Add dragend listener globally
});