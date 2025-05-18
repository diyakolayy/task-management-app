async function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    if (!taskInput) {
        alert('Please enter a task');
        return;
    }

    const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskInput })
    });
    const task = await response.json();

    const taskList = document.getElementById('taskList');
    const li = createTaskElement(task);
    taskList.appendChild(li);
    document.getElementById('taskInput').value = '';
}

async function deleteTask(id) {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
    });
    const taskElement = document.querySelector(`li[data-id="${id}"]`);
    taskElement.remove();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.textContent = task.task;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(task.id);
    li.appendChild(deleteBtn);
    return li;
}

async function loadTasks() {
    const response = await fetch('http://localhost:3000/api/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

window.onload = loadTasks;