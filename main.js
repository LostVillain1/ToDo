const domElems = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'),
}

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function(task) {
    const taskCssClass = task.isDone ? 'todo__task todo__task_completed' : 'todo__task'
    const checked = task.isDone ? 'checked' : ''
    let taskHtml = `
    <div id='${task.id}' class="${taskCssClass}"> 
        <label class="todo__checkbox">
            <input type="checkbox" ${checked}>            
        </label>
        <div class="todo__task-text">${task.text}</div>
        <div id="del" class="todo__task-del">
            <svg xmlns="http://www.w3.org/2000/svg" class='trash-can' width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </div>
    </div>
    `
    domElems.tasks.innerHTML = domElems.tasks.innerHTML + taskHtml
})


domElems.add.addEventListener('click', (e) => {
    const taskText = domElems.new.value
    if (taskText) {
        addTask(taskText)
    }
    domElems.new.value = ''
})

domElems.tasks.addEventListener('click', deleteTask)

domElems.tasks.addEventListener('click', editTask)

function addTask(taskText) {

    const newTask = {
        id: Date.now(),
        text: taskText,
        isDone: false
    }

    tasks.push(newTask)

    const taskCssClass = newTask.isDone ? 'todo__task todo__task_completed' : 'todo__task'
    const checked = newTask.isDone ? 'checked' : ''

    const taskHtml = `
    <div id='${newTask.id}' class="${taskCssClass}"> 
        <label class="todo__checkbox">
            <input type="checkbox" ${checked}>            
        </label>
        <div class="todo__task-text">${newTask.text}</div>
        <div id="del" class="todo__task-del">
            <svg xmlns="http://www.w3.org/2000/svg" class='trash-can' width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </div>
    </div>
    `
    console.log(newTask.is)
    domElems.tasks.innerHTML = domElems.tasks.innerHTML + taskHtml
    saveInLocalStorage()
}

function deleteTask(e) {
    deleteContainer = e.target.closest('.todo__task-del')
    if (deleteContainer) {
        const task = deleteContainer.closest('.todo__task')
        console.log(task)
        const id = parseInt(task.id)
        console.log(id)
        const arrayElem = tasks.find((elem) => { return elem.id === id })
        console.log(arrayElem)
        const index = tasks.indexOf(arrayElem)
        console.log(index)
        tasks = tasks.slice(index + 1, tasks.length)
        console.log(tasks)
        task.remove()
        saveInLocalStorage()
    }
}

function editTask(e) {
    const target = e.target
    if (target.tagName === 'INPUT') {
        const taskNode = target.closest('.todo__task')
        const id = parseInt(taskNode.id)
        console.log(id)
        const task = tasks.find((elem) => { return elem.id === id })
        task.isDone = !task.isDone
        if (target.parentNode.classList.contains('todo__checkbox')) {
            target.closest('.todo__task').classList.toggle('todo__task_completed')
        }
    }
    saveInLocalStorage()
}

function saveInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}