// Definición de variables
const taskForm = document.getElementById('taskForm');
const newTaskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');

// Evento para agregar tarea al presionar Enter
newTaskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
    }
});


// Función para marcar/desmarcar una tarea como realizada usando el checkbox
function toggleTaskStatusCheckbox(checkbox) {
    const taskTextElement = checkbox.nextElementSibling;
    taskTextElement.classList.toggle('completed', checkbox.checked);
}

// Función para eliminar una tarea
function deleteTask(button) {
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);
// Llamada a la función para guardar las tareas después de eliminar
    saveTasksToLocalStorage();
}

// Función para marcar/desmarcar una tarea como realizada
function toggleTaskStatus(span) {
    span.classList.toggle('completed');
}

// Función para eliminar todas las tareas
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

// Llamada a la función para guardar las tareas después de eliminar todas
    saveTasksToLocalStorage();
}

// Función para marcar todas las tareas como realizadas
function completeTasks() {
    const tasks = taskList.getElementsByTagName('span');
    for (let i = 0; i < tasks.length; i++) {
    tasks[i].classList.add('completed');
    }
}

// Función para editar una tarea
function editTask(icon) {
    const taskItem = icon.parentElement;
    const taskTextElement = taskItem.querySelector('span');
    const newText = prompt('Editar tarea:', taskTextElement.innerText);

    if (newText !== null) {
        taskTextElement.innerText = newText;

    // Llamada a la función para guardar las tareas después de editar
    saveTasksToLocalStorage();
    }
}

 // Función para marcar todas las tareas como realizadas
function completeAllTasks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
    checkbox.checked = true;
    const taskTextElement = checkbox.nextElementSibling;
    taskTextElement.classList.add('completed');
    });
}

// Función para desmarcar todas las tareas
function uncheckAllTasks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    const taskTextElement = checkbox.nextElementSibling;
    taskTextElement.classList.remove('completed');
    });
}

// Obtener tareas desde localStorage al cargar la página
window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
    });
};

// Función para agregar una nueva tarea al DOM y localStorage
function addTask() {
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
    addTaskToDOM(taskText, false);
    saveTasksToLocalStorage();
    newTaskInput.value = ''; // Limpia el campo de entrada
    }
}

function addTaskToDOM(taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.className = 'taskItem';
    taskItem.innerHTML = `
    <input type="checkbox" onchange="toggleTaskStatusCheckbox(this)" ${completed ? 'checked' : ''} />
    <span class="${completed ? 'completed' : ''}">${taskText}</span>
    <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
    <i class="fas fa-edit" onclick="editTask(this)"></i>
    `;

    taskList.appendChild(taskItem);
}

// Función para guardar las tareas en localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.taskItem');
    taskItems.forEach(taskItem => {
    const taskText = taskItem.querySelector('span').innerText;
    const completed = taskItem.querySelector('input').checked;
    tasks.push({ text: taskText, completed: completed });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
