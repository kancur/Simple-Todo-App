import ProjectList from "./projectList";
import Project from "./project";
import UI from "./UI";
import Todo from "./todo";

export default class App {
  constructor() {
    this.myUI = new UI(this.handleTodoDelete, this.handleTodoDone, this.handleProjectDelete)
    this.projectList = new ProjectList();
    this.currentProjectId = 1;
    this.initialize();
  }

  initialize() {
    this.addTestProjects()
    this.rerenderCurrentProjectTodos()
  }


  addTestProjects() {
    this.projectList.addProject(new Project('Test1'))
    this.projectList.addProject(new Project('Test4'))
    this.projectList.addProject(new Project('My third project'))

    const testtodo = new Todo("do your homework", "description", new Date('2022/03/17'), 10)
    const testtodo2 = new Todo("do shopping", "descriptsssion", undefined, 5)
    const testtodo3 = new Todo("do fuckin", "dfasdnfhadfhnahkdjlnhj asdnflkhjn", undefined, 30)

    this.projectList.projects[0].addTodo(testtodo);
    this.projectList.projects[0].addTodo(testtodo2);
    this.projectList.projects[1].addTodo(testtodo3);

    this.rerenderProjectsMenu()
  }

  rerenderProjectsMenu() {
    const projects = this.projectList.getProjects()
    this.myUI.renderProjectsMenu(projects, this.setCurrentProject, this.addNewProject, this.currentProjectId)
  }

  setCurrentProject = (id) => {
    this.currentProjectId = id;
    this.rerenderProjectsMenu()
    this.rerenderCurrentProjectTodos()
  }

  addNewProject = (name) => {
    const newProject = new Project(name)
    const id = this.projectList.addProject(newProject)
    this.setCurrentProject(id)
    this.rerenderProjectsMenu()
  }

  handleProjectDelete = (id) => {
    console.log('handling delete')
    this.projectList.removeProject(id)
    this.rerenderCurrentProjectTodos()
  }

  handleTodoDelete = (id) => {
    const currentProject = this.projectList.getProject(this.currentProjectId)
    currentProject.removeTodo(id)
    this.rerenderCurrentProjectTodos()
  }

  handleTodoDone = (id) => {
    const currentProject = this.projectList.getProject(this.currentProjectId);
    const todo = currentProject.getTodo(id);
    if (todo.completed){
      todo.uncomplete()
    } else {
      todo.complete()
    }
    this.rerenderCurrentProjectTodos()
  }

  rerenderCurrentProjectTodos() {
    console.log(`rendering todos for project ID: ${this.currentProjectId}`)
    const currentProject = this.projectList.getProject(this.currentProjectId)

    if (currentProject){
      this.myUI.renderTodos(currentProject.getTodos())
    }
  }
}
