export default class ProjectList {
  constructor() {
    this.projects = [];
    this.currentProject = undefined
  }

  addProject(project) {
    const id = this.projects.push(project);
    this.currentProject = id
  }

  getProjects(){
    return this.projects
  }

  getCurrentProject(){
    return this.projects[0] || undefined
  }

  setCurrentProject(id){
    this.currentProject = id
  }
}
