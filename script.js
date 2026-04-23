// Function to create a unique ID for each task
let taskCounter = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // Ensure we drop into the task-list div even if user drops on a task
    let target = ev.target;
    while (target && !target.classList.contains('column')) {
        target = target.parentElement;
    }
    
    if (target) {
        const list = target.querySelector('.task-list');
        list.appendChild(draggedElement);
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskId = "task-" + taskCounter++;
    const taskDiv = document.createElement('div');
    
    taskDiv.className = 'task';
    taskDiv.id = taskId;
    taskDiv.draggable = true;
    taskDiv.ondragstart = drag;
    taskDiv.innerText = taskText;

    document.getElementById('todo-tasks').appendChild(taskDiv);
    input.value = ""; // Clear input
}
