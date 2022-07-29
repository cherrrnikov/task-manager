const addForm = document.querySelector(".tasks-add");
const addInput = document.querySelector(".tasks-add__input");
const addDate = document.querySelector(".tasks-add__date-input");
const addPriorityContainer = document.querySelector(".tasks-add__priorities");
const checkboxes = [...document.querySelectorAll(".priority-checkbox")];
const tasksContainer = document.querySelector(".tasks-container");
let tasks = [];

const persistTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

class Task {
    _parentElement = tasksContainer;
    _task;
    constructor(title, date, priority) {
        this.title = title;
        this.date = date;
        this.priority = priority;
    }
    render() {
        const markup = this._generateMarkup();
        this._parentElement.appendChild(markup);
    }
    deleteTask() {
        this._task.addEventListener("click", (e) => {
            const btn = e.target.closest(".tasks-container__editing-btn");
            const ourTasks = [...this._parentElement.children];
            if (btn.dataset.edit === "delete") {
                this._task.remove();
                tasks.splice(ourTasks.indexOf(this._task), 1);
                persistTasks();
            } else {
                return;
            }
        });
    }

    _generateMarkup() {
        this._task = document.createElement("div");
        this._task.classList.add("tasks-container__task");
        const html = `
        <div class="tasks-container__info">
                <p class="tasks-container__text">
                    ${this.title}
                </p>
                <div class="tasks-container__deadline">
                    <img
                        src="img/calendar-mini.svg"
                        alt="Date"
                        class="tasks-container__calendar"
                    />
                    <span class="tasks-container__date" style="${
                        this.date ? "" : "margin-right: 0"
                    }"
                        >${this.date}</span
                    >
                    <div class="tasks-add__priorities-priority tasks-add__priorities-${
                        this.priority
                    }"></div>
                </div>
            </div>
            <div class="tasks-container__editing">
                <button
                    data-edit="delete"
                    class="tasks-container__editing-btn"
                >
                    <img
                        src="img/delete.svg"
                        alt=""
                        class="tasks-container__editing-icon"
                    />
                </button>
                <button
                    data-edit="edit"
                    class="tasks-container__editing-btn"
                >
                    <img
                        src="img/edit.svg"
                        alt=""
                        class="tasks-container__editing-icon"
                    />
                </button>
                <button
                    data-edit="highlight"
                    class="tasks-container__editing-btn"
                >
                    <img
                        src="img/highlight.svg"
                        alt=""
                        class="tasks-container__editing-icon"
                    />
                </button>
                <button
                    data-edit="done"
                    class="tasks-container__editing-btn"
                >
                    <img
                        src="img/done.svg"
                        alt=""
                        class="tasks-container__editing-icon"
                    />
                </button>
        </div>
        `;
        this._task.innerHTML += html;
        return this._task;
    }
}

const setCheck = function (e) {
    if (e.target.getAttribute("data-priority")) {
        checkboxes.forEach((item) => {
            item.checked = false;
            item.parentElement.classList.remove("checked");
        });
        e.target.checked = true;
        e.target.parentElement.classList.add("checked");
    }
};

const resetCheck = function () {
    checkboxes.forEach((item) => {
        if (item.checked) {
            item.parentElement.classList.add("checked");
        } else {
            item.parentElement.classList.remove("checked");
        }
    });
};

const renderTask = function (task) {
    const newTask = new Task(task.title, task.date, task.priority);
    newTask.render();
    newTask.deleteTask();
};

const createTask = function (e) {
    e.preventDefault();
    let priority;
    checkboxes.forEach((item) => {
        if (item.checked) {
            priority = item.dataset.priority;
        }
    });
    const task = {
        title: addInput.value,
        date: addDate.value,
        priority: priority,
    };
    tasks.push(task);
    addForm.reset();
    resetCheck();
    console.log(tasks);
    persistTasks();
    renderTask(task);
};

const init = function () {
    const storage = localStorage.getItem("tasks");
    if (storage) {
        tasks = JSON.parse(storage);
        tasks.forEach((task) => {
            renderTask(task);
        });
    }
};

init();

addForm.addEventListener("submit", createTask);
addPriorityContainer.addEventListener("click", setCheck);
