const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="trash-2"><rect width="24" height="24" opacity="0"/><path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12z"/><path d="M9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z"/><path d="M15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z"/></g></g></svg>`;

export default class UI {
  constructor(
    todoDeleteHandler,
    todoDoneHandler,
    projectDeleteHandler,
    todoAddHandler
  ) {
    this.container = document.querySelector("#container");
    this.todoDeleteHandler = todoDeleteHandler;
    this.todoDoneHandler = todoDoneHandler;
    this.projectDeleteHandler = projectDeleteHandler;
    this.todoAddHandler = todoAddHandler;
    this.initialize();
  }

  initialize() {
    const addTodo = document.querySelector("#addtodo");
    addTodo.addEventListener("click", () => {
      this.addTodoModal();
    });
  }

  addProjectModal(projectCreationHandler) {
    const form = document.createElement("form");
    const heading = document.createElement("h2");
    heading.textContent = "Enter your project name";
    const input = document.createElement("input");
    input.style.marginBottom = "15px";
    const btn = this.buttonFactory("Add Project", (e) => {
      e.target.blur();
    });
    btn.style.width = "auto";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value.length > 0) {
        projectCreationHandler(input.value);
        this.clearModal();
      }
    });

    form.append(heading, input, btn);

    this.renderModal(form);
  }

  createLabel(id, text) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = text;

    return label;
  }

  addTodoModal(projectCreationHandler) {
    const todoForm = document.createElement("form");
    const heading = document.createElement("h2");
    heading.textContent = "Enter new todo information";
    const todoTitleLabel = this.createLabel("todo-title", "Enter todo title");
    const todoTitle = document.createElement("input");
    todoTitle.id = "todo-title";

    const todoBodyLabel = this.createLabel(
      "todo-body",
      "Enter todo description"
    );
    const todoBody = document.createElement("input");
    todoBody.id = "todo-body";

    const todoDateLabel = this.createLabel(
      "todo-date",
      "Enter due date and time"
    );
    const todoDate = document.createElement("input");
    todoDate.id = "todo-date";

    //priority
    const todoPriorityLabel = this.createLabel(
      "todo-prio",
      "Choose todo priority"
    );
    const todoPriority = document.createElement("select");
    todoPriority.id = "todo-prio";

    const option1 = document.createElement("option");
    option1.value = "high";
    option1.innerText = "high";
    const option2 = document.createElement("option");
    option2.value = "low";
    option2.innerText = "low";
    todoPriority.append(option1, option2);

    todoDate.type = "datetime-local";
    const btn = this.buttonFactory("Add ToDo", (e) => {
      e.target.blur();
    });
    btn.style.width = "auto";

    const notification = document.createElement("div");
    notification.id = "form-notification";
    todoForm.append(
      heading,
      todoTitleLabel,
      todoTitle,
      todoBodyLabel,
      todoBody,
      todoDateLabel,
      todoDate,
      todoPriorityLabel,
      todoPriority,
      notification,
      btn
    );

    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (todoTitle.value.trim().length > 2) {
        const data = {
          title: todoTitle.value,
          body: todoBody.value,
          date: todoDate.value,
          priority: todoPriority.value,
        };

        this.todoAddHandler(data);
        this.clearModal();
      } else {
        notification.innerText = "A title of atleast 3 characters is required";
      }
    });

    this.renderModal(todoForm);
  }

  clearModal() {
    const modal = document.querySelector("#modal");
    modal.remove();
  }

  renderModal(internalElement) {
    const body = document.querySelector("body");
    const modal = document.createElement("div");
    modal.id = "modal";

    // input
    const box = document.createElement("div");
    box.classList.add("box", "add-modal");
    box.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    box.append(internalElement);
    modal.classList.add("modal");
    modal.addEventListener("click", () => {
      modal.remove();
    });
    modal.appendChild(box);
    body.prepend(modal);
  }

  renderProjectsMenu(
    projects,
    changeProjectHandler,
    addProjectHandler,
    currentID
  ) {
    const that = this;
    const wrapper = document.querySelector("#menuitems");
    const menubuttonsWrapper = document.querySelector('#menubuttons');
    wrapper.textContent = "";
    menubuttonsWrapper.innerHTML = "";

    const addProjectBtn = this.buttonFactory(
      "Add Project",
      (e) => {
        e.target.blur();
        this.addProjectModal(addProjectHandler);
      }
    );

    //wrapper.appendChild(addProjectBtn);
    menubuttonsWrapper.appendChild(addProjectBtn)

    projects.forEach((project, index) => {
      wrapper.appendChild(menuitem(project.name, index));
    });

    function menuitem(name, index) {
      const div = document.createElement("div");
      div.dataset.arrayId = index;
      div.classList.add("menuitem");
      div.addEventListener("click", (e) => {
        changeProjectHandler(index);
      });
      div.textContent = name;

      const trashIconWrapper = document.createElement("div");
      trashIconWrapper.classList.add("icon-wrapper", "red-btn");
      trashIconWrapper.addEventListener("click", () => {
        that.projectDeleteHandler(index);
      });

      trashIconWrapper.innerHTML += trashIcon;
      div.appendChild(trashIconWrapper);

      if (index === currentID) {
        div.style.backgroundColor = "#A8DADC";
      }

      return div;
    }
  }

  cleanTodos() {
    this.container.textContent = "";
  }

  buttonFactory = (text, clickListener, customClass) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("btn");
    if (customClass) {
      btn.classList.add(customClass);
    }
    btn.addEventListener("click", clickListener);
    return btn;
  };

  renderTodos(todos) {
    this.cleanTodos();
    if (todos.length > 0) {
      todos.forEach((todo, index) => {
        this.container.appendChild(this.todoBox(todo, index));
      });
    } else {
      const div = document.createElement("div");
      div.textContent = "No todos yet";
      this.container.appendChild(div);
    }
  }

  todoBox(todo, index) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("todo-wrapper", "box");
    wrapper.dataset.arrayId = index;

    const leftSide = document.createElement("div");
    leftSide.classList.add("leftside");
    const rightSide = document.createElement("div");
    rightSide.classList.add("rightside");

    const headingWrapper = document.createElement("div");
    headingWrapper.classList.add("todo-headline-wrapper");

    const heading = document.createElement("h2");
    heading.textContent = todo.title;
    heading.style.textDecoration = todo.completed && "line-through";

    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.style.backgroundColor =
      todo.priority === "high" ? "#e63946" : "ffbc57";
    priority.innerText = `${todo.priority} Priority`;

    headingWrapper.append(heading, priority);

    const description = document.createElement("p");
    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date");
    const isCompleted = document.createElement("div");
    isCompleted.classList.add("completed-wrap");

    const buttonRemove = this.buttonFactory(
      "Remove todo",
      (e) => {
        e.target.blur();
        this.todoDeleteHandler(index);
      },
      "red-btn"
    );

    const buttonDone = this.buttonFactory(
      !todo.completed ? "Mark as done" : "Mark as not done",
      (e) => {
        e.target.blur();
        this.todoDoneHandler(index);
      }
    );

    description.textContent = todo.description;
    dueDate.textContent = todo.getFormattedDate();
    isCompleted.textContent = todo.completed ? "Completed" : "Not done";
    todo.completed
      ? isCompleted.classList.add("is-green")
      : isCompleted.classList.remove("is-green");

    const buttonRow = document.createElement("div");
    buttonRow.append(buttonDone, buttonRemove);
    buttonRow.classList.add("button-row");

    leftSide.append(headingWrapper, dueDate, description);
    rightSide.append(isCompleted, buttonRow);

    wrapper.append(leftSide, rightSide);

    return wrapper;
  }
}
