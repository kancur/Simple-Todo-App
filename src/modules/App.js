import ProjectList from "./ProjectList";
import Project from "./Project";
import UI from "./UI";
import Todo from "./Todo";
import { parseISO } from 'date-fns'
import Storage from "./Storage";


export default class App {
  constructor() {
    this.storage = new Storage();
    this.myUI = new UI(this.handleTodoDelete, this.handleTodoDone, this.handleProjectDelete, this.handleTodoAdd)
    this.projectList = new ProjectList();
    this.currentProjectId = this.storage.loadCurrentID() || 0;
    this.isFirstRun = this.storage.loadStringified('isFirstRun') ? true : false
    this.initialize();
  }

  initialize() {
    console.log('is first run?', this.isFirstRun)
    console.log('is first run?', this.storage.loadStringified('isFirstRun'))
    this.storage.saveStringified('isFirstRun', false)
    // get data from localstorage and populate
    const data = this.storage.getDataFromLocalStorage();

    this.populateProjectsFromLocalStorageData(data)

    // add test projects with todos if first run
    this.isFirstRun && this.addTestProjects()

    // first render logic run
    this.rerenderProjectsLogic()
    this.rerenderTodosLogic()
  }

  populateProjectsFromLocalStorageData(data) {
    if (data) {
      data.forEach(project => {
        const id = this.projectList.addProject(new Project(project.name))
        const currentProject = this.projectList.getProject(id)

         if (project.todos.length > 0) {
          this.populateProjectWithTodos(currentProject, project.todos)
        } 

      });
    }
  };

  populateProjectWithTodos(project, todos) {
    todos.forEach(todo => {
      if (todo.dueDate){
        todo.dueDate = parseISO(todo.dueDate)
      }
      const todoObject = Object.assign(new Todo(), todo);
      project.addTodo(todoObject)
    });
  }

  addTestProjects() {
    this.projectList.addProject(new Project('Test1'))
    this.projectList.addProject(new Project('Test4'))
    this.projectList.addProject(new Project('My third project'))

    const testtodo = new Todo("do your homework", "description", new Date('2022/03/17'), 'low')
    const testtodo2 = new Todo("do shopping", "descriptsssion", undefined, 'high')
    const testtodo3 = new Todo("do fuckin", "dfasdnfhadfhnahkdjlnhj asdnflkhjn", undefined, 'low')

    this.projectList.projects[0].addTodo(testtodo);
    this.projectList.projects[0].addTodo(testtodo2);
    this.projectList.projects[1].addTodo(testtodo3);

  }

  getCurrentProject() {
    return this.projectList.getProject(this.currentProjectId)
  }


  setCurrentProjectID = (id) => {
    this.currentProjectId = id;
    this.rerenderProjectsLogic()
    this.rerenderTodosLogic()
    this.storage.saveCurrentID(id)
  }

  handleProjectAdd = (name) => {
    const newProject = new Project(name)
    const id = this.projectList.addProject(newProject)
    this.setCurrentProjectID(id)
    this.rerenderProjectsLogic()
  }

  handleProjectDelete = (id) => {
    this.projectList.removeProject(id)
    this.rerenderTodosLogic()
  }

  handleTodoDelete = (id) => {
    const currentProject = this.getCurrentProject()
    currentProject.removeTodo(id)
    this.rerenderTodosLogic()
  }

  handleTodoDone = (id) => {
    const currentProject = this.getCurrentProject()
    const todo = currentProject.getTodo(id);
    if (todo.completed) {
      todo.uncomplete()
    } else {
      todo.complete()
    }
    this.rerenderTodosLogic()
  }

  handleTodoAdd = (data) => {
    const currentProject = this.getCurrentProject()

    let date = undefined
    if (data.date) {
      date = parseISO(data.date)
    }

    const newTodo = new Todo(data.title, data.body, date, data.priority)
    currentProject.addTodo(newTodo)
    this.rerenderTodosLogic()
  }

  rerenderProjectsLogic() {
    const projects = this.projectList.getProjects()
    this.myUI.renderProjectsMenu(projects, this.setCurrentProjectID, this.handleProjectAdd, this.currentProjectId)
    this.storage.saveDataToLocalStorage(projects)
  }

  rerenderTodosLogic() {
    const currentProject = this.projectList.getProject(this.currentProjectId)

    // render in UI
    if (currentProject) {
      this.myUI.renderTodos(currentProject.getTodos())
    }

    // update state in localStorage
    this.storage.saveDataToLocalStorage(this.projectList.getProjects())
  }
}
