// Initialize board from LocalStorage or empty arrays
let tasks = JSON.parse(localStorage.getItem('kanban-tasks')) || [];

function saveToLocalStorage() {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
}

function renderTasks() {
    // Clear current lists
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.id = task.id;
        taskElement.draggable = true;
        taskElement.ondragstart = drag;
        
        taskElement.innerHTML = `
            <span>${task.content}</span>
            <i class="fas fa-trash delete-btn" onclick="deleteTask('${task.id}')"></i>
        `;

        document.getElementById(`${task.status}-list`).appendChild(taskElement);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    const newTask = {
        id: 't-' + Date.now(),
        content: input.value,
        status: 'todo'
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
    input.value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToLocalStorage();
    renderTasks();
}

// Drag & Drop Handlers
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text");
    
    // Find the closest list ID (todo, inprogress, or done)
    let targetList = ev.target;
    while (targetList && !targetList.id.includes('-list')) {
        targetList = targetList.parentElement;
    }

    if (targetList) {
        const newStatus = targetList.id.replace('-list', '');
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex > -1) {
            tasks[taskIndex].status = newStatus;
            saveToLocalStorage();
            renderTasks();
        }
    }
}

// Initial Load
renderTasks();
