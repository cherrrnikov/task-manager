const addForm = document.querySelector(".tasks-add");
const addInput = document.querySelector(".tasks-add__input");
const addDate = document.querySelector(".tasks-add__date-input");
const addPriorityContainer = document.querySelector(".tasks-add__priorities");
const checkboxes = [...document.querySelectorAll(".priority-checkbox")];
const tasksContainer = document.querySelector(".tasks-container");
const tasksEdit = document.querySelector(".tasks-container__editing");
let tasks = [];

class Task {
    _parentElement = tasksContainer;
    constructor(title, date, priority) {
        this.title = title;
        this.date = date;
        this.priority = priority;
    }
    render() {
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    _generateMarkup() {
        return `
        <div class="tasks-container__task">
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
                    <span class="tasks-container__date"
                        >${this.date}</span
                    >
                    <div class="tasks-container__status"></div>
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
        </div>
        `;
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
    const newTask = new Task(task.title, task.date, task.priority).render();
    console.log(tasks);
};
const deleteTask = function () {};

addForm.addEventListener("submit", createTask);
addPriorityContainer.addEventListener("click", setCheck);
