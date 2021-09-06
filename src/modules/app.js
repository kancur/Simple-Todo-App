import ProjectList from "./projectList";
import Project from "./project";
import UI from "./UI";
import Todo from "./todo";

const myUI = new UI()


export default class App{
  constructor(){
    this.projectList = new ProjectList()
    this.initialize()
  }

  initialize(){
    this.addTestProjects()
    this.renderCurrentProjectTasks()
  }

  addTestProjects(){
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

  rerenderProjectsMenu(){
    const projects = this.projectList.getProjects()
    myUI.renderProjectsMenu(projects)
  }


  renderCurrentProjectTasks(){
    const currentProject = this.projectList.getCurrentProject()

    if (currentProject){
      console.log(currentProject)
      myUI.renderTodos(currentProject.getTodos())
    }

  }
}