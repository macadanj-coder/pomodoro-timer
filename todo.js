todoItem = document.getElementById('taskInput');
taskList = document.getElementById('taskList');
completedTasks = document.getElementById('completedTasks');

let tasks = [];

function createTask(taskText) {
    return {
        taskID: Date.now(),
        taskText: taskText,
        isCompleted: false
    };
}


function toggleTaskCompletion(taskID) { 
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.taskID === taskID);
    if (taskIndex !== -1) {
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }   
    taskList.removeChild(document.getElementById(taskID));
    drawTask(tasks[taskIndex]);
}

function drawTask(task) {
    const li = document.createElement('li');
    li.id = task.taskID;
    li.textContent = task.taskText;
    const completeButton = document.createElement('button');
    completeButton.textContent = "✓";
    completeButton.classList.add('complete-button');
    completeButton.onclick = toggleTaskCompletion.bind(null, task.taskID);
    li.appendChild(completeButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "✕";
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        if (task.isCompleted) {
            completedTasks.removeChild(li);
        } else {
            taskList.removeChild(li);
        }
        removeTask(task.taskID);
    };
    li.appendChild(deleteButton)
    if (task.isCompleted) {
        completedTasks.appendChild(li);
    } else {
        taskList.appendChild(li);
    }
}


function addTask() { 
    const taskText = todoItem.value.trim();
    if (!taskText) return;

    const task = createTask(taskText);
    console.log('Created task:', task);
    console.log('task type:', typeof task); 
    todoItem.value = "";
    saveTask(task);
    drawTask(task);

}

function removeTask(taskID) { 
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.taskID !== taskID);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const existingIndex = tasks.findIndex(t => t.taskID === task.taskID);
    
    if (existingIndex !== -1) {
        tasks[existingIndex] = task;
    } else {
        tasks.push(task);
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        drawTask(task);
    });
}

window.onload = loadTasks;