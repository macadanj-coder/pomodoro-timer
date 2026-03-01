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

function createCompleteButton(task) {
    const button = document.createElement('button');
    button.textContent = task.isCompleted ? "↺" : "✓";
    button.classList.add('complete-button');
    button.onclick = function() {
        toggleTaskCompletion(task.taskID);
    };
    return button;
}

function createDeleteButton(task) {
    const button = document.createElement('button');
    button.textContent = "✕";
    button.classList.add('delete-button');
    button.onclick = function() {
        if (task.isCompleted) {
            completedTasks.removeChild(document.getElementById(task.taskID));
        } else {
            taskList.removeChild(document.getElementById(task.taskID));
        }
        removeTask(task.taskID);
    };
    return button;
}

function drawTask(task) {
    const li = document.createElement('li');
    li.id = task.taskID;
    li.textContent = task.taskText;
    const completeButton = createCompleteButton(task);
    li.appendChild(completeButton);

    const deleteButton = createDeleteButton(task);
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

function completeFirstTask() {  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const firstIncompleteTask = tasks.find(task => !task.isCompleted);
    if (firstIncompleteTask) {
        toggleTaskCompletion(firstIncompleteTask.taskID);
    }
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