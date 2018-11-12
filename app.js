const form = document.querySelector('form');
const ul = document.querySelector('ul');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
let tasks;
//Calling all Event function
AllEventFunction();
//create All Event function
function AllEventFunction() {
    //Creating task Event 
    form.addEventListener('submit', addTask);
    //Creating event to load all tasks from local storage
    document.addEventListener('DOMContentLoaded', loadTaskFromLocalStorage);
    //Creating event to delete single li
    ul.addEventListener('click', deleteSingleTask);
    //creating event to filtering all tasks
    filter.addEventListener('keyup', filterAllTasks);
    //Creating event to clear all tasks
    clearBtn.addEventListener('click', clearAllTasks);
};
//Creating add a task fuction
function addTask(e) {
    //Preventing form submition
    e.preventDefault();
    if (taskInput.value == '') {
        alert('Add a task');
    } else {
        //creating li
        const li = document.createElement('li');
        //adding classes to li
        li.className = 'collection-item';
        //adding text to the task
        li.appendChild(document.createTextNode(taskInput.value));
        //creating link
        const a = document.createElement('a');
        //adding classes to the link
        a.className = 'delete-item secondary-content';
        //adding icon to the link
        a.innerHTML = '<i class="fa fa-remove"></i>';
        //appending link to the li
        li.appendChild(a);
        //appending li to ul 
        ul.appendChild(li);
        //adding task to local Storage
        addToLocalStorage(taskInput.value);
        //clearing the task input
        taskInput.value = '';
    };
};
//Creating function to set local storage
function setLocalStorage() {
  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }  
  return tasks;
};

//Creating funcitn to send to local storage
function sendToLocalStorage(tasksToSend) {
    localStorage.setItem('tasks', JSON.stringify(tasksToSend));
};

//creating function to add to local storage
function addToLocalStorage(task) {
    setLocalStorage();
    tasks.push(task);
    sendToLocalStorage(tasks);
};

//Creating function to load all tasks from local storage
function loadTaskFromLocalStorage() {
    setLocalStorage();
    tasks.forEach(function (o) {
        //creating li
        const li = document.createElement('li');
        //adding classes to li
        li.className = 'collection-item';
        //adding text to the task
        li.appendChild(document.createTextNode(o));
        //creating link
        const a = document.createElement('a');
        //adding classes to the link
        a.className = 'delete-item secondary-content';
        //adding icon to the link
        a.innerHTML = '<i class="fa fa-remove"></i>';
        //appending link to the li
        li.appendChild(a);
        //appending li to ul 
        ul.appendChild(li);
    });
};
//Creating function to delete single task
function deleteSingleTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    };
    //Call funtion to delete single tasks from local storage
    deleteSingleTasksFromLocalStorage(e.target.parentElement.parentElement);
};
//Creating funciton to delete from local stoage
function deleteSingleTasksFromLocalStorage(task) {
    setLocalStorage();
    tasks.forEach(function (o, i, a) {
        if (task.textContent === o) {
            a.splice(i, 1);
        };
    });
    sendToLocalStorage(tasks);
};
//Creating funciton to filter all tasks
function filterAllTasks(e) {
    const lis = Array.from(ul.children);
    lis.forEach(function (o) {
        if (o.textContent.toLowerCase().includes(filter.value.toLowerCase())) {
            o.style.display = 'block';
        } else {
            o.style.display = 'none';
        }
    });
};
//Creating function to clear all Tasks
function clearAllTasks() {
    //Deleting all tasks from ul
    ul.innerHTML = '';
    //Deleting all tasks form local storage
    localStorage.removeItem('tasks');
    
};